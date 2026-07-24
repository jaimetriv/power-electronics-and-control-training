# Project 01 - PWM Fundamentals and Oscilloscope Measurements

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md

---

## Objective

In this project you will learn:

- What PWM is
- How Arduino or ESP32 generates PWM
- How to measure PWM with the OWON HDS272S oscilloscope
- Frequency
- Period
- Duty cycle
- Average voltage
- LED brightness control

This project introduces one of the most important concepts in modern electronics.

PWM is used in:

- LED dimmers
- DC motor drives
- Buck converters
- Boost converters
- Inverters
- Switching power supplies
- Control systems

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain PWM

✅ Calculate duty cycle

✅ Measure frequency

✅ Measure period

✅ Use the OWON HDS272S oscilloscope

✅ Generate PWM using Arduino or ESP32

✅ Explain how PWM controls power

---

## Theory

### What is PWM?

PWM stands for:

**Pulse Width Modulation**

Arduino cannot produce a true analogue voltage.

Instead it switches rapidly between:

```text
0 V
```

and

```text
5 V
```

creating a square wave.

```text
5V ──────      ──────
         │      │
         │      │
0V ______│______│________
```

Although the signal is digital, the average energy delivered to a load can be continuously varied.

---

## Period

The period is the duration of one complete cycle.

Symbol:

$$
T
$$

Units:

- seconds (s)
- milliseconds (ms)
- microseconds (µs)

```text
<------ T ------>
5V ──────
         │
         │
0V ______│______
```

---

## Frequency

Frequency is the number of cycles occurring per second.

$$
f = \frac{1}{T}
$$

Where:

- $f$ = Frequency (Hz)
- $T$ = Period (s)

### Example

If:

$$
T = 1 \text{ ms}
$$

Then:

$$
f = \frac{1}{0.001} = 1000 \text{ Hz} = 1 \text{ kHz}
$$

---

## Duty Cycle

Duty cycle describes how long a signal remains HIGH within one period.

$$
D = \frac{T_{ON}}{T}
$$

Where:

- $D$ = Duty Cycle
- $T_{ON}$ = Time signal is HIGH
- $T$ = Total period

---

### 25% Duty Cycle

```text
5V ──
      │
      │
0V ___│__________
```

---

### 50% Duty Cycle

```text
5V ─────
         │
         │
0V ______│______
```

---

### 75% Duty Cycle

```text
5V ─────────
            │
            │
0V __________│__
```

---

## Average Voltage

The average output voltage of a PWM waveform is approximately:

$$
V_{AVG} = D \cdot V_S
$$

Where:

- $V_{AVG}$ = Average Voltage
- $D$ = Duty Cycle
- $V_S$ = Supply Voltage

### Example

Given:

$$
V_S = 5 \text{ V}, \quad D = 0.5
$$

Then:

$$
V_{AVG} = 0.5 \times 5 = 2.5 \text{ V}
$$

---

## PWM on Arduino Uno and ESP32

On Arduino Uno, the function:

```cpp
analogWrite()
```

generates PWM.

On ESP32, PWM is generated with the LEDC peripheral (see Project 00C for setup details).

Valid values:

```text
0 → 255
```

| PWM Value | Approximate Duty Cycle |
|-----------|------------------------|
| 0 | 0% |
| 64 | 25% |
| 128 | 50% |
| 192 | 75% |
| 255 | 100% |

Controller pin options for this experiment:

```text
Arduino Uno: Pin 9
ESP32:       GPIO18
```

---

## MATLAB Simulation

Before building the circuit, simulate a PWM waveform in MATLAB to predict what you will observe on the oscilloscope.

### Simulate a PWM Waveform

```matlab
fs = 490;
D = 0.5;

T = 1/fs;
ts = T/1000;
t = 0:ts:4*T;

pwm = double(mod(t,T) < D*T);

plot(t*1000, pwm*5, 'LineWidth', 2)

grid on
ylim([-0.5 6])

xlabel('Time (ms)')
ylabel('Voltage (V)')
title('Simulated PWM Waveform - 490 Hz, 50% Duty Cycle')
```

### Expected Result

You should see a square wave switching between 0 V and 5 V with equal ON and OFF times.

### Predict

Before measuring, record your predictions:

| Parameter | Predicted Value |
|-----------|----------------|
| Frequency | |
| Period | |
| Duty Cycle | |
| Peak Voltage | |

---

### Simulate Multiple Duty Cycles

```matlab
fs = 490;
T = 1/fs;
ts = T/1000;
t = 0:ts:4*T;

D_values = [0.25, 0.5, 0.75];
labels = {'25%', '50%', '75%'};

figure

for k = 1:3
    D = D_values(k);
    pwm = double(mod(t,T) < D*T);

    subplot(3,1,k)
    plot(t*1000, pwm*5, 'LineWidth', 2)
    grid on
    ylim([-0.5 6])
    ylabel('Voltage (V)')
    title(['Duty Cycle = ' labels{k}])
end

xlabel('Time (ms)')
```

### Expected Result

Observe how the ON time increases as duty cycle increases while the period remains constant.

---

## Required Components

### SparkFun Inventor Kit

- Arduino Uno
- Breadboard
- LED
- 220 Ω resistor
- Jumper wires

### Equipment

- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Experiment 1 - Generate a PWM Signal

### Objective

Generate a 50% duty cycle PWM signal and observe it on the oscilloscope.

---

### Connections

```text
Probe Tip  ──────► Arduino Pin D9  (or ESP32 GPIO18)
Probe GND  ──────► Arduino GND
```

No breadboard components are needed for this experiment.

---

### Arduino Code

```cpp
void setup()
{
    // No explicit pinMode needed; analogWrite() configures the pin automatically.
}

void loop()
{
    // Output a PWM signal on pin 9 with approximately 50% duty cycle.
    // analogWrite() accepts values from 0 (0%) to 255 (100%).
    // Value 128 gives approximately 50% duty cycle: 128/255 ≈ 50%.
    analogWrite(9, 128);
}
```

### ESP32 Equivalent Code

```cpp
void setup()
{
    // Configure LEDC channel 0: frequency 490 Hz, 8-bit resolution (0–255).
    ledcSetup(0, 490, 8);

    // Attach GPIO18 to channel 0.
    ledcAttachPin(18, 0);
}

void loop()
{
    // Set duty cycle to 128/255 ≈ 50%.
    ledcWrite(0, 128);
}
```

---

### Why 128?

Arduino uses a PWM range of 0 to 255. Therefore:

$$
\frac{128}{255} \approx 50\%
$$

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

```text
5V  ─────      ─────
         │    │
         │    │
0V  _____│____│_____
```

---

### Measurements

Measure the following and record in the table:

#### Frequency

Expected:

$$
f \approx 490 \text{ Hz}
$$

On Arduino Uno Pin 9, this value is typically around 490 Hz. Small variation is normal.

#### Period

Expected:

$$
T \approx 2 \text{ ms}
$$

#### Peak Voltage

Expected:

$$
V_{PEAK} \approx 5 \text{ V}
$$

---

### Measurement Worksheet

| Parameter | Expected | Measured |
|-----------|----------|---------|
| Frequency | 490 Hz | |
| Period | 2 ms | |
| Peak Voltage | 5 V | |

---

## Experiment 2 - Duty Cycle Investigation

### Objective

Observe how duty cycle affects the PWM waveform shape.

---

### Connections

Same as Experiment 1:

```text
Probe Tip  ──────► Arduino Pin D9
Probe GND  ──────► Arduino GND
```

---

### Test A — 25% Duty Cycle

Upload:

```cpp
void loop()
{
    // 64/255 ≈ 25% duty cycle: short ON time, long OFF time.
    analogWrite(9, 64);
}
```

ESP32 equivalent:

```cpp
void loop()
{
    ledcWrite(0, 64);
}
```

Expected duty cycle:

$$
\frac{64}{255} \approx 25\%
$$

Observe the waveform. The ON time should be approximately one quarter of the total period.

---

### Test B — 50% Duty Cycle

```cpp
void loop()
{
    // 128/255 ≈ 50% duty cycle: equal ON and OFF times.
    analogWrite(9, 128);
}
```

---

### Test C — 75% Duty Cycle

```cpp
void loop()
{
    // 192/255 ≈ 75% duty cycle: long ON time, short OFF time.
    analogWrite(9, 192);
}
```

---

### Results Table

| PWM Value | Expected Duty Cycle | Measured Duty Cycle |
|-----------|---------------------|---------------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |

---

## Experiment 3 - LED Brightness Control

### Objective

Use PWM to control LED brightness and observe the relationship between duty cycle and perceived brightness.

### Components

- LED
- 220 Ω resistor
- Breadboard
- 2 jumper wires

---

### Circuit Diagram

```text
Arduino Pin D9  (or ESP32 GPIO18)
    │
   220 Ω resistor
    │
   LED anode (long leg)
   LED cathode (short leg)
    │
Arduino GND
```

---

### Step-by-Step Wiring

1. Push the 220 Ω resistor across the breadboard so each leg is in a different row.
2. Connect a jumper wire from **Arduino pin D9** to one leg of the resistor.
3. Insert the LED so its **long leg (anode)** sits in the same row as the other resistor leg.
4. Connect a jumper wire from the **LED short leg (cathode)** row to any **GND** pin on the Arduino.

The current path will be:

```text
D9 → Resistor → LED anode → LED cathode → GND
```

---

### Wiring Checklist

Before uploading:

✅ Resistor leg in same breadboard row as Arduino D9 jumper

✅ LED long leg (anode) in same row as other resistor leg

✅ LED short leg (cathode) connected to GND

✅ PWM pin used (D9 on Arduino Uno — not all pins support PWM)

---

### Code

```cpp
void setup()
{
    // No explicit pinMode needed; analogWrite() configures the pin automatically.
}

void loop()
{
    // Step through four brightness levels with a 2-second pause at each.
    // analogWrite() range: 0 (off) to 255 (fully on).

    analogWrite(9, 64);    // ~25% duty cycle → dim
    delay(2000);

    analogWrite(9, 128);   // ~50% duty cycle → medium brightness
    delay(2000);

    analogWrite(9, 192);   // ~75% duty cycle → bright
    delay(2000);

    analogWrite(9, 255);   // 100% duty cycle → fully on
    delay(2000);
}
```

---

### Observe

Watch the LED as the code cycles through each brightness level.

The LED should step through:

```text
Dim  →  Medium  →  Bright  →  Fully ON
```

then repeat.

---

### Results Table

| PWM Value | Duty Cycle | Observed Brightness |
|-----------|------------|---------------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |
| 255 | 100% | |

---

### Why Does Brightness Change?

The LED is switching ON and OFF approximately:

$$
490 \text{ times per second}
$$

Your eyes cannot distinguish individual flashes at this speed.

Instead they perceive the average light output.

A higher duty cycle means more ON time, more delivered energy, and higher perceived brightness.

---

## MATLAB Comparison

Compare your measured results against the theoretical prediction.

### Plot the Theoretical Line

```matlab
D = 0:0.01:1;

Vavg_theory = 5 .* D;

plot(D, Vavg_theory, 'b-', 'LineWidth', 2)

grid on
hold on

xlabel('Duty Cycle')
ylabel('Average Voltage (V)')
title('PWM Average Voltage - Theory vs Measurement')
```

### Overlay Your Measurements

```matlab
% Enter your measured duty cycles here
D_measured = [0.25, 0.50, 0.75, 1.00];

% Enter your measured average voltages here
Vavg_measured = [1.20, 2.45, 3.68, 4.90];

plot(D_measured, Vavg_measured, 'ro', ...
    'MarkerSize', 10, ...
    'MarkerFaceColor', 'r')

legend('Theory', 'Measured', 'Location', 'northwest')
```

### Reflection

- Do your measured points fall on the theoretical line?
- Does the simulated waveform match what you observed on the oscilloscope?
- If there are differences, what might explain them?

---

## Troubleshooting

### No Signal Visible

Check:

✅ Probe tip connected to the correct pin (D9 on Arduino Uno)

✅ Probe ground connected to Arduino GND

✅ Code uploaded successfully

✅ If using ESP32: ledcSetup() and ledcAttachPin() called in setup()

---

### LED Does Not Light

Check:

✅ LED polarity (long leg to resistor, short leg to GND)

✅ 220 Ω resistor in series

✅ Jumper wire from D9 to resistor

---

### Waveform Unstable

Check:

✅ Trigger type set to Edge, Rising

✅ Trigger level set to approximately 2.5 V

---

### Troubleshooting Checklist

✅ Controller powered and sketch uploaded

✅ Probe on active PWM pin (Arduino D9 or ESP32 GPIO18)

✅ Probe ground on GND

✅ Trigger enabled

✅ Correct time scale (500 µs/div for 490 Hz signal)

✅ Correct voltage scale (2 V/div)

---

## Laboratory Exercises

### Exercise 1

Modify the code to output a 10% duty cycle. Calculate the expected average voltage and verify it on the oscilloscope.

---

### Exercise 2

Write a sketch that smoothly fades the LED from OFF to fully ON and back, using a for loop and `analogWrite()`.

---

### Exercise 3

Connect a potentiometer to A0 and use its reading to control the PWM duty cycle in real time. Observe the waveform change on the oscilloscope as you turn the knob.

---

## Knowledge Check

### Question 1

What does PWM stand for?

---

### Question 2

What duty cycle corresponds to `analogWrite(9, 128)`?

---

### Question 3

If the supply voltage is 5 V and the duty cycle is 75%, what is the average voltage?

---

### Question 4

Why does PWM control LED brightness even though the signal only switches between 0 V and 5 V?

---

### Question 5

Your MATLAB simulation predicted a frequency of 490 Hz but you measured 492 Hz on the oscilloscope. What could explain this difference?

---

## Project Summary

In this project you learned:

✅ Frequency

✅ Period

✅ Duty cycle

✅ PWM

✅ Average voltage

✅ PWM generation on Arduino or ESP32

✅ Oscilloscope measurements with the OWON HDS272S

✅ LED brightness control

These concepts will appear repeatedly throughout the rest of this course.

---

## Next Project

```text
02_RC_Circuits.md
```

Topics:

- Capacitor Charging
- Capacitor Discharging
- Time Constants
- First-Order Systems
- Exponential Response
- Transient Measurements
