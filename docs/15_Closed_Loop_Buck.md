# Project 15 - Closed-Loop Buck Converter Control

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 08_PWM_Motor_Control.md
- 12_P_Controller.md
- 13_PI_Controller.md
- 14_PID_Controller.md
- 06_Buck_Converter.md

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

In Project 06 the Buck Converter operated in open loop.

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

## Simulink / Simscape Simulation

Before building the circuit, simulate the closed-loop PI voltage regulator applied to the Buck Converter plant.

You will build two models:

- **Model 1** — Open-loop Simscape Buck Converter (plant characterisation)
- **Model 2** — Closed-loop PI regulator (signal-only Simulink using the identified plant transfer function)

---

### Model 1 — Open-Loop Buck Converter (Simscape)

This model reuses the Buck Converter from Project 06. If you still have that model, open it and add a Voltage Sensor across the output capacitor. Otherwise build it fresh using the steps below.

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `buck_open_loop.slx`.

#### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| Controlled Voltage Source | Simscape → Electrical → Sources | 1 |
| Ideal Switch | Simscape → Electrical → Switches & Breakers | 1 |
| Diode | Simscape → Electrical → Semiconductors & Converters | 1 |
| Inductor | Simscape → Electrical → Passives | 1 |
| Capacitor | Simscape → Electrical → Passives | 1 |
| Resistor | Simscape → Electrical → Passives | 1 |
| Voltage Sensor | Simscape → Electrical → Sensors | 1 |
| Electrical Reference | Simscape → Electrical → Electrical Elements | 1 |
| Pulse Generator | Simulink → Sources | 1 |
| PS-Simulink Converter | Simscape → Utilities | 1 |
| Scope | Simulink → Sinks | 1 |
| Solver Configuration | Simscape → Utilities | 1 |

#### Step 3 — Set block parameters

Controlled Voltage Source: `3.3` V (connect a Constant block set to `3.3` to its control input)

Pulse Generator (switch drive):

| Parameter | Value |
|-----------|-------|
| Amplitude | `1` |
| Period | `0.002` s (500 Hz) |
| Pulse width | `50` % |
| Phase delay | `0` |

Inductor: `100e-6` H

Capacitor: `100e-6` F

Resistor (load): `100` Ω

Diode: Forward voltage `0.7` V, On resistance `0.01` Ω

#### Step 4 — Wire the Buck circuit

```text
Voltage Source (+) → Ideal Switch (p)
Ideal Switch (n) → Inductor (p)  [switch node]
Switch node → Diode (cathode)
Diode (anode) → Electrical Reference (GND)
Inductor (n) → Capacitor (p) → Resistor (p)  [Vout node]
Capacitor (n) → Resistor (n) → Electrical Reference
Voltage Source (−) → Electrical Reference
```

Connect Voltage Sensor across the output:

```text
Voltage Sensor (+) → Vout node
Voltage Sensor (−) → Electrical Reference
```

Connect Pulse Generator → Ideal Switch control input.

Connect Solver Configuration to any node.

Connect: `Voltage Sensor (V) → PS-Simulink Converter → Scope`

#### Step 5 — Configure simulation settings

1. Open **Modeling → Model Settings**.
2. Set **Solver** to `ode23t`.
3. Set **Stop time** to `0.05` s.
4. Set **Max step size** to `1e-5`.

#### Step 6 — Run and observe

Click **Run**. The Scope should show Vout rising and settling to approximately:

$$
V_{OUT} = D \times V_{IN} = 0.5 \times 3.3 = 1.65\ \text{V}
$$

with switching ripple visible.

---

### Model 2 — Closed-Loop PI Regulator (Simulink)

This model uses the LC filter transfer function as the plant and closes the loop with a PI controller in signal-only Simulink.

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `buck_closed_loop_pi.slx`.

#### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| Step | Simulink → Sources | 1 |
| Sum | Simulink → Math Operations | 2 |
| Gain | Simulink → Math Operations | 3 |
| Integrator | Simulink → Continuous | 1 |
| Transfer Fcn | Simulink → Continuous | 1 |
| Scope | Simulink → Sinks | 1 |

#### Step 3 — Set block parameters

Step block (reference voltage):

| Parameter | Value |
|-----------|-------|
| Step time | `0` s |
| Initial value | `0` |
| Final value | `1.65` |

Sum block 1 (error junction): signs `+-`

Gain block 1 (Kp): `10`

Gain block 2 (Ki): `1.0`

Sum block 2 (PI sum): signs `++`

Gain block 3 (Vin × plant scaling): `3.3`

Transfer Fcn (LC filter plant `1/(LCs² + (L/R)s + 1)`):

| Parameter | Value |
|-----------|-------|
| Numerator | `[1]` |
| Denominator | `[1e-8, 1e-3, 1]` |

> Denominator = `[L×C, L/R, 1]` = `[100e-6×100e-6, 100e-6/100, 1]` = `[1e-8, 1e-3, 1]`

#### Step 4 — Wire the closed-loop

```text
Step → Sum1 (+) input
Sum1 output → Kp Gain → Sum2 (+) input 1
Sum1 output → Ki Gain → Integrator → Sum2 (+) input 2
Sum2 output → Vin Gain → Transfer Fcn → Scope
Transfer Fcn output → Sum1 (−) input   [feedback path]
```

#### Step 5 — Wiring checklist

✅ Step output connected to Sum1 (+) input

✅ Sum1 output branched to Kp Gain and Ki Gain

✅ Ki Gain → Integrator → Sum2 input 2

✅ Kp Gain → Sum2 input 1

✅ Sum2 → Vin Gain → Transfer Fcn → Scope

✅ Transfer Fcn output fed back to Sum1 (−) input

✅ Sum1 signs `+-`, Sum2 signs `++`

#### Step 6 — Configure simulation settings

1. Open **Modeling → Model Settings**.
2. Set **Solver** to `ode45`.
3. Set **Stop time** to `0.5` s.

#### Step 7 — Run for each gain set

| Kp | Ki | Expected behaviour |
|----|----|--------------------|
| `2` | `0.2` | Slow response, minimal overshoot |
| `10` | `1.0` | Balanced response |
| `50` | `5.0` | Fast, possible overshoot |

Change Kp and Ki Gain block values for each run.

#### Step 8 — Wiring checklist before each run

✅ Kp and Ki Gain block values updated

✅ Feedback wire still connected to Sum1 (−) input

✅ Scope showing Transfer Fcn output

---

### Prediction Table

| Kp | Ki | Predicted behaviour | Predicted e\_{ss} |
|----|----|--------------------|-----------------:|
| 2 | 0.2 | | |
| 10 | 1 | | |
| 50 | 5 | | |

---

## Components Required

- ESP32 DevKit V1
- Buck Converter from Project 08 (MOSFET, diode, inductor, capacitor)
- 2 × 10 kΩ resistors (voltage divider)
- Breadboard and jumper wires
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

> Arduino Uno can be used as a backup controller if an ESP32 is not available.

---

## Experiment 1 - Measure Converter Output

### Objective

Read the converter output voltage using the controller ADC and verify the voltage divider is working correctly.

---

### Step-by-Step Wiring

Keep the Buck Converter from Project 08 intact.

1. Insert the **first 10 kΩ resistor** so one leg connects to the **Vout node** and the other leg is in a new row. This is the top of the divider.
2. Insert the **second 10 kΩ resistor** so one leg is in the same row as the bottom of the first resistor and the other leg connects to **GND**. This is the bottom of the divider.
3. Connect a jumper wire from the **midpoint** (junction between the two resistors) to **ESP32 GPIO34** (or **Arduino A0** as backup).

The midpoint voltage will be:

$$
V_{A0} = \frac{V_{OUT}}{2}
$$

---

### Wiring Checklist

Before uploading:

✅ Top resistor connected between Vout and divider midpoint

✅ Bottom resistor connected between divider midpoint and GND

✅ Divider midpoint connected to GPIO34 (ESP32) or A0 (Arduino backup)

✅ Buck Converter circuit intact from Project 08

---

### ESP32 Code

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

### Arduino Equivalent Code (backup)

```cpp
void setup()
{
    Serial.begin(9600);
}

void loop()
{
    // analogRead() returns 0–1023 on Arduino 10-bit ADC.
    int adc = analogRead(A0);

    Serial.println(adc);

    delay(100);
}
```

---

### Observe

The ADC value should vary with output voltage and duty cycle.

---

### Convert ADC Reading to Voltage

For ESP32:

$$
V_{GPIO34} = \frac{ADC}{4095} \times 3.3\ \text{V}
$$

$$
V_{OUT} = V_{GPIO34} \times 2
$$

For Arduino backup:

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

### ESP32 Code

```cpp
const int PWM_PIN  = 18;
const int FBK_PIN  = 34;

const float dt      = 0.01;
const float Vref    = 1.65;    // target divider midpoint for ~3.3 V output
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

### Arduino Equivalent Code (backup)

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
    Serial.begin(9600);
}

void loop()
{
    int   adc      = analogRead(A0);
    float Vfb      = (adc / 1023.0) * 5.0;   // voltage at divider midpoint (V)
    float Vout_est = Vfb * 2.0;               // estimated converter output (V)

    float error = Vref - Vfb;

    integral = integral + error * dt;
    integral = constrain(integral, -int_max, int_max);

    float control = Kp * error + Ki * integral;
    control = constrain(control, 0, 255);

    analogWrite(9, (int)control);

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
16_Controller_Design.md
```

Topics:

- Step-Up Conversion
- Boost Converter Operation
- Inductor Energy Transfer
- Duty Cycle Relationships
- Converter Efficiency
- Practical Measurements
