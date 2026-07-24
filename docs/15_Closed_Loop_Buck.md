# Project 15 - Closed-Loop Buck Converter Control

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 10_PWM_Motor_Control.md
- 12_P_Controller.md
- 13_PI_Controller.md
- 14_PID_Controller.md
- 08_Buck_Converter.md

---

## Objective

In this project you will learn:

- Why open-loop Buck Converters have limitations
- How voltage feedback works
- How PI controllers regulate output voltage
- How disturbances affect converter performance
- How feedback improves regulation
- How to tune a closed-loop converter
- How control theory and power electronics work together

This project combines power electronics and control systems to create a practical regulated power supply.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain closed-loop regulation

✅ Implement voltage feedback

✅ Calculate voltage error

✅ Implement a PI controller

✅ Explain disturbance rejection

✅ Tune PI gains

✅ Analyse converter performance

---

## Introduction

In Project 08 the Buck Converter operated in open loop.

The controller generated a fixed duty cycle and the output depended entirely on input voltage, component values, and load conditions.

No automatic correction occurred.

---

## Problem with Open-Loop Operation

Suppose $V_{OUT} = 5\ \text{V}$ and the load increases.

The voltage may fall to $4.5\ \text{V}$.

An open-loop controller does not detect the error.

Therefore no correction occurs.

---

## Closed-Loop Control

Closed-loop control measures the output voltage continuously.

The measured voltage is compared to a desired value.

The controller then adjusts duty cycle automatically.

---

## Closed-Loop Block Diagram

```text
Reference Voltage → [−] → PI Controller → Buck Converter → Output Voltage
                       ↑                                          │
                       └──────────── Voltage Feedback ────────────┘
```

---

## Voltage Divider Circuit

The controller ADC can only measure voltages within its supported range.

A voltage divider scales the converter output to a safe level:

```text
Vout
  │
 10 kΩ
  │──── A0  (ADC input)
 10 kΩ
  │
 GND
```

For equal resistors:

$$
V_{A0} = \frac{V_{OUT}}{2}
$$

---

## PI Controller Equation

$$
u(t) = K_P e(t) + K_I \int e(t)\,dt
$$

---

## Converter Control Strategy

```text
Measure Output → Calculate Error → PI Controller → Adjust Duty Cycle → Correct Output Voltage
```

---

## MATLAB Simulation

Before building the circuit, simulate the closed-loop PI voltage regulator applied to the Buck Converter plant.

### Buck Converter Plant Model

```matlab
L   = 100e-6;      % 100 uH
C   = 100e-6;      % 100 uF
R   = 100;         % assumed load resistance (Ohm)
Vin = 5;           % supply voltage

% Open-loop plant (LC filter)
G = tf(1, [L*C, L/R, 1]);

% Voltage divider scales feedback by 0.5
H = 0.5;

t = 0:0.0001:0.5;

figure;
[y_ol, ~] = step(Vin * G, t);
plot(t*1e3, y_ol, 'k--', 'LineWidth', 2, 'DisplayName', 'Open-loop');
hold on;
```

### Closed-Loop PI Response — Three Gain Sets

```matlab
gain_sets = [2, 0.2; 10, 1.0; 50, 5.0];
labels    = {'Kp=2  Ki=0.2', 'Kp=10 Ki=1', 'Kp=50 Ki=5'};

for i = 1:3
    Kp = gain_sets(i,1);
    Ki = gain_sets(i,2);
    C_pi = tf([Kp, Ki], [1, 0]);
    T    = feedback(C_pi * G * Vin, H);
    [y, ~] = step(T, t);
    plot(t*1e3, y, 'LineWidth', 2, 'DisplayName', labels{i});
end

yline(2.5, 'r:', 'Reference 2.5V');
grid on;
xlabel('Time (ms)'); ylabel('Output Voltage (V)');
title('Closed-Loop Buck Converter - PI Gain Comparison');
legend('Location', 'southeast');
```

### Prediction Table

| Kp | Ki | Predicted behaviour | Predicted ess |
|----|----|--------------------|--------------:|
| 2 | 0.2 | | |
| 10 | 1 | | |
| 50 | 5 | | |

---

## Components Required

- Arduino Uno or ESP32 DevKit V1
- Buck Converter from Project 08 (MOSFET, diode, inductor, capacitor)
- 2 × 10 kΩ resistors (voltage divider)
- Breadboard and jumper wires
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Experiment 1 - Measure Converter Output

### Objective

Read the converter output voltage using the controller ADC and verify the voltage divider is working correctly.

---

### Step-by-Step Wiring

Keep the Buck Converter from Project 08 intact.

1. Insert the **first 10 kΩ resistor** so one leg connects to the **Vout node** and the other leg is in a new row. This is the top of the divider.
2. Insert the **second 10 kΩ resistor** so one leg is in the same row as the bottom of the first resistor and the other leg connects to **GND**. This is the bottom of the divider.
3. Connect a jumper wire from the **midpoint** (junction between the two resistors) to **Arduino A0** (or **ESP32 GPIO34**).

The midpoint voltage will be:

$$
V_{A0} = \frac{V_{OUT}}{2}
$$

---

### Wiring Checklist

Before uploading:

✅ Top resistor connected between Vout and divider midpoint

✅ Bottom resistor connected between divider midpoint and GND

✅ Divider midpoint connected to A0 (Arduino) or GPIO34 (ESP32)

✅ Buck Converter circuit intact from Project 08

---

### Arduino Code

```cpp
void setup()
{
    // Start serial communication to display the ADC reading.
    Serial.begin(9600);
}

void loop()
{
    // Read the voltage divider midpoint.
    // This represents Vout / 2.
    int adc = analogRead(A0);

    Serial.println(adc);

    delay(100);
}
```

### ESP32 Equivalent Code

```cpp
const int FBK_PIN = 34;

void setup()
{
    Serial.begin(115200);
}

void loop()
{
    // analogRead() returns 0–4095 on ESP32 12-bit ADC.
    int adc = analogRead(FBK_PIN);

    Serial.println(adc);

    delay(100);
}
```

---

### Observe

The ADC value should vary with output voltage and duty cycle.

---

### Convert ADC Reading to Voltage

For Arduino Uno:

$$
V_{A0} = \frac{ADC}{1023} \times 5\ \text{V}
$$

$$
V_{OUT} = V_{A0} \times 2
$$

---

## Experiment 2 - Implement PI Regulation

### Objective

Automatically regulate the converter output voltage to a fixed reference using a PI controller.

---

### Circuit

Same as Experiment 1 — voltage divider connected to A0.

---

### Arduino Code

```cpp
const float dt        = 0.01;     // sample time (s) — matches delay(10)
const float Vref      = 2.5;      // target voltage at divider midpoint (V)
                                  // corresponds to Vout = 5.0 V
const float int_max   = 50.0;     // anti-windup limit

float Kp = 10.0;
float Ki = 1.0;
float integral = 0;

void setup()
{
    // No explicit pinMode needed; analogWrite() configures the pin automatically.
    Serial.begin(9600);
}

void loop()
{
    // Read the voltage divider midpoint.
    int   adc      = analogRead(A0);
    float Vfb      = (adc / 1023.0) * 5.0;   // voltage at divider midpoint (V)
    float Vout_est = Vfb * 2.0;               // estimated converter output (V)

    // Error in divider-scaled units.
    float error = Vref - Vfb;

    // Integral term with anti-windup.
    integral = integral + error * dt;
    integral = constrain(integral, -int_max, int_max);

    // PI controller output → PWM duty cycle command.
    float control = Kp * error + Ki * integral;
    control = constrain(control, 0, 255);

    analogWrite(9, (int)control);

    Serial.print("Vout: ");  Serial.print(Vout_est, 3);
    Serial.print("V  PWM: "); Serial.print((int)control);
    Serial.print("  Int: ");  Serial.println(integral, 3);

    delay(10);
}
```

### ESP32 Equivalent Code

```cpp
const int PWM_PIN  = 18;
const int FBK_PIN  = 34;

const float dt      = 0.01;
const float Vref    = 1.65;    // target divider midpoint for ~3.3V output
const float int_max = 50.0;

float Kp = 10.0;
float Ki = 1.0;
float integral = 0;

void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);
    ledcAttachPin(PWM_PIN, 0);
    Serial.begin(115200);
}

void loop()
{
    int   adc      = analogRead(FBK_PIN);
    float Vfb      = (adc / 4095.0) * 3.3;   // voltage at divider midpoint (V)
    float Vout_est = Vfb * 2.0;               // estimated converter output (V)
    float error    = Vref - Vfb;

    integral = integral + error * dt;
    integral = constrain(integral, -int_max, int_max);

    float control = Kp * error + Ki * integral;
    control = constrain(control, 0, 255);

    ledcWrite(0, (int)control);

    Serial.print("Vout: ");  Serial.print(Vout_est, 3);
    Serial.print("V  PWM: "); Serial.print((int)control);
    Serial.print("  Int: ");  Serial.println(integral, 3);

    delay(10);
}
```

---

### Observe

The Serial Monitor should show Vout converging toward the target value.

The PWM duty cycle should adjust automatically to maintain regulation.

---

## Experiment 3 - Disturbance Rejection

### Objective

Observe how feedback corrects disturbances.

---

### Procedure

Operate the converter normally with the PI controller running.

Then:

- Connect a small additional load resistor across the output, or
- Briefly change the input voltage slightly.

---

### Observe

The output voltage will deviate briefly.

The controller will then adjust the duty cycle and return the voltage toward the target value.

This ability to recover from disturbances is called **disturbance rejection** — one of the primary advantages of closed-loop control.

---

## Experiment 4 - PI Gain Tuning

### Objective

Observe how controller gains affect system behaviour.

---

### Test A

```cpp
Kp = 2;
Ki = 0.2;
```

Expected: slow response.

---

### Test B

```cpp
Kp = 10;
Ki = 1;
```

Expected: balanced response.

---

### Test C

```cpp
Kp = 50;
Ki = 5;
```

Expected: very aggressive response, possible oscillation.

---

### Results Table

| Kp | Ki | Behaviour |
|----|----|-----------|
| 2 | 0.2 | |
| 10 | 1 | |
| 50 | 5 | |

---

## Oscilloscope Exercise

### PWM Signal

```text
Probe Tip  ──────► MOSFET Gate
Probe GND  ──────► GND
```

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Output Voltage Ripple

```text
Probe Tip  ──────► Vout node
Probe GND  ──────► GND
```

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 200 mV/div | 200 mV/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | AC | AC |

---

### Observe

As the controller regulates voltage:

- Duty cycle changes automatically
- Ripple changes with operating conditions
- Output voltage remains close to the reference value

---

## MATLAB Comparison

Compare your measured steady-state output voltages against the simulated closed-loop responses.

```matlab
L = 100e-6; C = 100e-6; R = 100; Vin = 5; H = 0.5;
G = tf(1, [L*C, L/R, 1]);

gain_sets = [2, 0.2; 10, 1.0; 50, 5.0];
labels    = {'Kp=2 Ki=0.2', 'Kp=10 Ki=1', 'Kp=50 Ki=5'};

% Replace with your measured steady-state Vout for each gain set
Vout_measured = [0.0, 0.0, 0.0];   % (V)

t = 0:0.0001:0.5;

figure; hold on;
for i = 1:3
    Kp = gain_sets(i,1); Ki = gain_sets(i,2);
    C_pi = tf([Kp, Ki], [1, 0]);
    T    = feedback(C_pi * G * Vin, H);
    [y, ~] = step(T, t);
    info = stepinfo(T);
    plot(t*1e3, y, 'LineWidth', 2, 'DisplayName', ...
        sprintf('%s | OS=%.1f%% Ts=%.1fms', labels{i}, ...
        info.Overshoot, info.SettlingTime*1e3));
end
yline(2.5, 'k--', 'Reference 2.5V');
scatter([50, 50, 50], Vout_measured, 80, 'r', 'filled', ...
    'DisplayName', 'Measured Vout');
grid on;
xlabel('Time (ms)'); ylabel('Output Voltage (V)');
title('Closed-Loop Buck - Simulation vs Measurement');
legend('Location', 'southeast');
```

### Reflection

- Does the PI controller eliminate steady-state error in both simulation and measurement?
- Which gain set gave the best balance of speed and stability on the real converter?
- Why might the real converter oscillate at lower gains than the simulation predicts?

---

## Troubleshooting

### Output Voltage Oscillates

Check:

✅ Reduce Kp and Ki

✅ Check anti-windup limit in code

---

### No Feedback Reading

Check:

✅ Voltage divider wiring (top resistor to Vout, bottom to GND, midpoint to A0)

✅ ADC pin correct

---

### PWM Saturated

Check:

✅ Controller output constrain() limits

✅ Reference voltage Vref matches divider ratio

---

### Troubleshooting Checklist

✅ Voltage divider functioning (midpoint voltage ≈ Vout/2)

✅ ADC value changes correctly with Vout

✅ PWM signal present at MOSFET gate

✅ PI controller running

✅ Output responds to disturbances

✅ Stable regulation achieved

✅ Output voltage remains near target

---

## Knowledge Check

### Question 1

What is the purpose of voltage feedback?

---

### Question 2

Write the PI controller equation.

---

### Question 3

What is disturbance rejection?

---

### Question 4

Why is a voltage divider required?

---

### Question 5

What happens if the gains are too large?

---

### Question 6

The voltage divider scales Vout by 0.5 before the ADC. The reference in the code is set to 2.5 V. What actual output voltage is the controller regulating to, and what would you change in the code to regulate to 3.0 V instead?

---

## Project Summary

In this project you learned:

✅ Closed-loop regulation

✅ Voltage feedback

✅ PI control

✅ Disturbance rejection

✅ Controller tuning

✅ Converter dynamics

✅ Stability concepts

✅ Practical voltage regulation

---

## Next Project

```text
09_Boost_Converter.md
```

Topics:

- Step-Up Conversion
- Boost Converter Operation
- Inductor Energy Transfer
- Duty Cycle Relationships
- Converter Efficiency
- Practical Measurements
