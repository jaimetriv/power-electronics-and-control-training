# Project 01 - PWM Fundamentals and Oscilloscope Measurements

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md

---

## Objective

In this project you will learn:

- What PWM is
- How ESP32 or Arduino generates PWM
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

✅ Generate PWM using ESP32 or Arduino

✅ Explain how PWM controls power

---

## Theory

### What is PWM?

PWM stands for:

**Pulse Width Modulation**

A microcontroller cannot produce a true analogue voltage.

Instead it switches rapidly between:

```text
0 V
```

and

```text
3.3 V  (ESP32)  /  5 V  (Arduino Uno)
```

creating a square wave.

```text
V_S ──────      ──────
          │      │
          │      │
0V ───────│──────│────────
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

---

## Frequency

Frequency is the number of cycles occurring per second.

$$
f = \frac{1}{T}
$$

### Example

If $T = 1\ \text{ms}$:

$$
f = \frac{1}{0.001} = 1000\ \text{Hz} = 1\ \text{kHz}
$$

---

## Duty Cycle

Duty cycle describes how long a signal remains HIGH within one period.

$$
D = \frac{T_{ON}}{T}
$$

---

### 25% Duty Cycle

```text
V_S ──
       │
       │
0V ────│──────────
```

---

### 50% Duty Cycle

```text
V_S ─────
          │
          │
0V ───────│───────
```

---

### 75% Duty Cycle

```text
V_S ─────────
             │
             │
0V ──────────│───
```

---

## Average Voltage

$$
V_{AVG} = D \cdot V_S
$$

### Example

$V_S = 3.3\ \text{V}$, $D = 0.5$:

$$
V_{AVG} = 0.5 \times 3.3 = 1.65\ \text{V}
$$

---

## PWM on ESP32

PWM is generated using the **LEDC peripheral** (see Project 00C for full setup details).

Valid duty cycle values (8-bit):

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

Controller pin for this experiment:

```text
ESP32: GPIO18
```

> **Arduino Uno:** use pin D9 with `analogWrite(9, value)` instead of the LEDC functions.

---

## MATLAB Simulation

Before building the circuit, simulate a PWM waveform in MATLAB to predict what you will observe on the oscilloscope.

### Simulate a PWM Waveform

```matlab
fs = 500;
D = 0.5;

T = 1/fs;
ts = T/1000;
t = 0:ts:4*T;

pwm = double(mod(t,T) < D*T);

plot(t*1000, pwm*3.3, 'LineWidth', 2)

grid on
ylim([-0.5 4])

xlabel('Time (ms)')
ylabel('Voltage (V)')
title('Simulated PWM Waveform - 500 Hz, 50% Duty Cycle')
```

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
fs = 500;
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
    plot(t*1000, pwm*3.3, 'LineWidth', 2)
    grid on
    ylim([-0.5 4])
    ylabel('Voltage (V)')
    title(['Duty Cycle = ' labels{k}])
end

xlabel('Time (ms)')
```

---

## Required Components

- ESP32 DevKit V1
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

1. Insert the CH1 probe BNC connector into **CH1** on the OWON HDS272S.
2. Clip the **ground clip** to any **GND pin** on the ESP32.
3. Hook the **probe tip** directly onto **ESP32 GPIO18**.

```text
CH1 socket    ◄──── BNC connector
ESP32 GND     ◄──── Ground clip
ESP32 GPIO18  ◄──── Probe tip
```

No breadboard components are needed. The probe connects directly to the pin.

---

### ESP32 Code

```cpp
void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution (0–255).
    ledcSetup(0, 500, 8);

    // Attach GPIO18 to channel 0.
    ledcAttachPin(18, 0);
}

void loop()
{
    // Set duty cycle to 128/255 ≈ 50%.
    ledcWrite(0, 128);
}
```

> **Arduino Uno:** replace the LEDC setup with `analogWrite(9, 128)` on pin D9.

---

### Why 128?

The PWM range is 0 to 255. Therefore:

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
3.3V  ─────      ─────
           │    │
           │    │
0V    _____│____│_____
```

---

### Measurements

| Parameter | Expected | Measured |
|-----------|----------|---------|
| Frequency | 500 Hz | |
| Period | 2 ms | |
| Peak Voltage | ~3.3 V | |

---

## Experiment 2 - Duty Cycle Investigation

### Objective

Observe how duty cycle affects the PWM waveform shape.

---

### Connections

Same physical connections as Experiment 1:

1. BNC connector into **CH1** on the OWON HDS272S.
2. Ground clip to any **GND pin** on the ESP32.
3. Probe tip onto **ESP32 GPIO18**.

The duty cycle steps every 3 seconds. Watch the ON-time change at each step.

---

### Code

```cpp
void setup()
{
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    // Step through three duty cycles with a 3-second pause at each.

    ledcWrite(0, 64);    // ~25% duty cycle: short ON, long OFF
    delay(3000);

    ledcWrite(0, 128);   // ~50% duty cycle: equal ON and OFF
    delay(3000);

    ledcWrite(0, 192);   // ~75% duty cycle: long ON, short OFF
    delay(3000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin D9.

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
ESP32 GPIO18
    │
   220 Ω resistor
    │
   LED anode (long leg)
   LED cathode (short leg)
    │
ESP32 GND
```

---

### Breadboard Layout

```
  ESP32 DevKit V1              BREADBOARD (top view, rows 1–12)
  ┌────────────┐
  │            │               Columns
  │            │         a      b      c      d      e
  │    GPIO18  ●────┐  ┌─────────────────────────────────────┐
  │            │    │  │ 1   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    │  │ 2   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    │  │ 3   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    │  │ 4   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    └─→│ 5   [●]   [ ]   [┐]   [ ]   [ ]    │ GPIO18 → a5, Resistor top c5
  │            │       │ 6   [ ]   [ ]   [│]   [ ]   [ ]    │
  │            │       │ 7   [ ]   [ ]   [│]   [ ]   [ ]    │ 220 Ω resistor (c5–c8)
  │            │       │ 8   [ ]   [ ]   [┘]   [ ]   [▲]   │ Resistor bottom c8, LED+ e8
  │            │       │ 9   [ ]   [ ]   [ ]   [ ]   [│]   │
  │            │       │10   [ ]   [ ]   [ ]   [ ]   [▼]   │ LED cathode at e10
  │        GND ●────┐  │11   [ ]   [ ]   [ ]   [ ]   [ ]   │
  │            │    │  └─────────────────────────────────────┘
  └────────────┘    │                                │
                    │                                │ GND wire
                    └────────────────────────────────┘
```

> **Arduino Uno:** replace GPIO18 with pin D9. Breadboard layout is identical.

Row connections (all holes in a row are internally linked):
- Row 5: `a5` (GPIO18 wire) and `c5` (resistor top) → both at the PWM output node
- Row 8: `c8` (resistor bottom) and `e8` (LED anode) → both at the LED input node

---

### Step-by-Step Wiring

1. Insert the **220 Ω resistor** vertically: one leg in **row 5, column c**, other in **row 8, column c**.
2. Connect a jumper wire from **ESP32 GPIO18** to **row 5, column a**.
3. Insert the LED so its **long leg (anode)** is in **row 8, column e** and its **short leg (cathode)** is in **row 10, column e**.
4. Connect a jumper wire from **row 10, column e** to any **GND pin** on the ESP32.

The current path will be:

```text
GPIO18 → Resistor → LED anode → LED cathode → GND
```

---

### Wiring Checklist

Before uploading:

✅ Resistor leg in same breadboard row as ESP32 GPIO18 jumper

✅ LED long leg (anode) in same row as other resistor leg

✅ LED short leg (cathode) at row 10, connected to GND

✅ PWM-capable GPIO used (GPIO18)

---

### Code

```cpp
void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    // Step through four brightness levels with a 2-second pause at each.

    ledcWrite(0, 64);    // ~25% duty cycle → dim
    delay(2000);

    ledcWrite(0, 128);   // ~50% duty cycle → medium brightness
    delay(2000);

    ledcWrite(0, 192);   // ~75% duty cycle → bright
    delay(2000);

    ledcWrite(0, 255);   // 100% duty cycle → fully on
    delay(2000);
}
```

### Arduino Equivalent Code

```cpp
void setup() {}

void loop()
{
    analogWrite(9, 64);
    delay(2000);

    analogWrite(9, 128);
    delay(2000);

    analogWrite(9, 192);
    delay(2000);

    analogWrite(9, 255);
    delay(2000);
}
```

---

### Observe

Watch the LED as the code cycles through each brightness level:

```text
Dim  →  Medium  →  Bright  →  Fully ON
```

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

The LED is switching ON and OFF approximately 500 times per second.

Your eyes cannot distinguish individual flashes at this speed.

Instead they perceive the average light output.

A higher duty cycle means more ON time, more delivered energy, and higher perceived brightness.

---

## MATLAB Comparison

```matlab
D = 0:0.01:1;

Vavg_theory = 3.3 .* D;

plot(D, Vavg_theory, 'b-', 'LineWidth', 2)

grid on
hold on

xlabel('Duty Cycle')
ylabel('Average Voltage (V)')
title('PWM Average Voltage - Theory vs Measurement')
```

### Overlay Your Measurements

```matlab
D_measured = [0.25, 0.50, 0.75, 1.00];
Vavg_measured = [0.00, 0.00, 0.00, 0.00];   % replace with your values

plot(D_measured, Vavg_measured, 'ro', ...
    'MarkerSize', 10, ...
    'MarkerFaceColor', 'r')

legend('Theory', 'Measured', 'Location', 'northwest')
```

---

## Troubleshooting

### No Signal Visible

Check:

✅ Probe tip connected to GPIO18

✅ Probe ground connected to GND

✅ Code uploaded successfully

✅ ledcSetup() and ledcAttachPin() called in setup()

---

### LED Does Not Light

Check:

✅ LED polarity (long leg to resistor, short leg to GND)

✅ 220 Ω resistor in series

✅ Jumper wire from GPIO18 to resistor

---

### Troubleshooting Checklist

✅ Controller powered and sketch uploaded

✅ Probe on active PWM pin (ESP32 GPIO18 or Arduino D9)

✅ Probe ground on GND

✅ Trigger enabled

✅ Correct time scale (500 µs/div for 500 Hz signal)

✅ Correct voltage scale (2 V/div)

---

## Laboratory Exercises

### Exercise 1

Modify the code to output a 10% duty cycle. Calculate the expected average voltage and verify it on the oscilloscope.

---

### Exercise 2

Write a sketch that smoothly fades the LED from OFF to fully ON and back, using a for loop and `ledcWrite()`.

---

### Exercise 3

Connect a potentiometer to GPIO34 and use its reading to control the PWM duty cycle in real time. Observe the waveform change on the oscilloscope as you turn the knob.

---

## Knowledge Check

### Question 1

What does PWM stand for?

---

### Question 2

What duty cycle corresponds to `ledcWrite(0, 128)`?

---

### Question 3

If the supply voltage is 3.3 V and the duty cycle is 75%, what is the average voltage?

---

### Question 4

Why does PWM control LED brightness even though the signal only switches between 0 V and 3.3 V?

---

### Question 5

Your MATLAB simulation predicted a frequency of 500 Hz but you measured 502 Hz on the oscilloscope. What could explain this difference?

---

## Project Summary

In this project you learned:

✅ Frequency

✅ Period

✅ Duty cycle

✅ PWM

✅ Average voltage

✅ PWM generation on ESP32 or Arduino

✅ Oscilloscope measurements with the OWON HDS272S

✅ LED brightness control

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
