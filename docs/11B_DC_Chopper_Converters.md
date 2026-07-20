# Project 11B - DC Chopper Converters and DC Motor Drives

## Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_PWM_Motor_Control.md
- 06_P_Controller.md
- 07_PI_Controller.md
- 08_PID_Controller.md
- 09_Buck_Converter.md
- 10_Closed_Loop_Buck.md
- 11_Boost_Converter.md

---

# Objective

In this project you will learn:

- What a chopper converter is
- How PWM creates chopper action
- The relationship between Buck and Boost converters
- DC motor chopper drives
- Average voltage control
- Quadrant operation
- Industrial applications of choppers

This project connects:

```text
Power Electronics
```

with:

```text
Motor Drives
```

---

# Learning Outcomes

At the end of this project you should be able to:

✅ Define a chopper converter

✅ Explain chopper operation

✅ Calculate average output voltage

✅ Explain first-quadrant operation

✅ Measure PWM waveforms

✅ Explain motor speed control using choppers

✅ Relate Buck and Boost converters to choppers

---

# Introduction

A Chopper Converter is a:

```text
DC-to-DC Converter
```

that controls the average value of a DC voltage by rapidly switching a semiconductor device ON and OFF.

---

# Why Is It Called a Chopper?

The input DC voltage is:

```text
Chopped
```

into pulses.

Example:

```text
12V ─────      ─────
          │      │
          │      │
0V _______│______│______
```

The average value depends on the duty cycle.

---

# Chopper Principle

The switch repeatedly alternates between:

```text
ON
```

and

```text
OFF
```

states.

A PWM signal controls the switching process.

---

# Average Output Voltage

For an ideal step-down chopper:

$$
V_{OUT}=D \cdot V_{IN}
$$

Where:

- $V_{OUT}$ = Output Voltage
- $D$ = Duty Cycle
- $V_{IN}$ = Input Voltage

---

# Example

Given:

$$
V_{IN}=12V
$$

and:

$$
D=0.5
$$

Then:

$$
V_{OUT}=0.5 \cdot 12
$$

$$
V_{OUT}=6V
$$

---

# Chopper Versus Linear Control

## Linear Control

```text
Input
 ↓
Resistor
 ↓
Output
```

Disadvantages:

- Heat generation
- Lower efficiency

---

## Chopper Control

```text
Input
 ↓
Switching
 ↓
Output
```

Advantages:

- High efficiency
- Low losses
- Better performance

---

# Chopper Classification

Traditional power electronics classifies choppers by operating quadrant.

---

# Type A Chopper

Also called:

```text
Step-Down Chopper
```

or:

```text
Buck Converter
```

Characteristics:

- Positive voltage
- Positive current

---

# Type B Chopper

Also called:

```text
Step-Up Chopper
```

or:

```text
Boost Converter
```

Characteristics:

- Voltage boosting

---

# Quadrant Concept

Motor drives are often described using:

```text
Torque
```

and

```text
Speed
```

---

# First Quadrant

```text
Positive Voltage
Positive Current
```

Motor operates normally.

Forward motoring.

---

# Four Quadrants

```text
      Speed

        +
        |
   II   |   I
        |
--------+--------
        |
   III  |   IV
        |
        -
```

---

# Practical Relevance

Most Arduino motor control projects operate in:

```text
First Quadrant
```

only.

This is sufficient for:

- PWM speed control
- Buck converters
- Basic robotics

---

# Relationship to Previous Projects

## Project 5

PWM motor control.

---

## Project 9

Buck Converter.

Type A Chopper.

---

## Project 11

Boost Converter.

Type B Chopper.

---

# Chopper Controlled Motor Drive

```mermaid
graph LR

A[Battery]
--> B[MOSFET Chopper]

B --> C[DC Motor]
```

---

# How Speed Control Works

Motor average voltage is:

$$
V_{AVG}=D \cdot V_S
$$

Where:

- $V_S$ = Supply Voltage
- $D$ = Duty Cycle

Motor speed is approximately proportional to average voltage.

---

# MATLAB Simulation

Before building the circuit, simulate the chopper waveforms and unified converter comparison to consolidate what you have learned in Projects 9, 10 and 11.

## Unified Chopper Comparison

```matlab
Vin = 5;
D   = 0:0.001:0.95;

Vout_typeA = Vin .* D;              % Type A: step-down (Buck)
Vout_typeB = Vin ./ (1 - D);        % Type B: step-up (Boost)
Vavg_motor = Vin .* D;              % Chopper motor drive (same as Type A)

figure; hold on;
plot(D, Vout_typeA, 'b',  'LineWidth', 2, 'DisplayName', 'Type A (Buck)  V_{OUT}=D\cdotV_{IN}');
plot(D, Vout_typeB, 'r',  'LineWidth', 2, 'DisplayName', 'Type B (Boost) V_{OUT}=V_{IN}/(1-D)');
plot(D, Vavg_motor, 'g--','LineWidth', 1.5,'DisplayName', 'Motor Drive    V_{AVG}=D\cdotV_S');
yline(Vin, 'k:', sprintf('V_{IN} = %.0fV', Vin));
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('DC Chopper Converters \mdash Unified Comparison (V_{IN}=5V)');
legend('Location', 'northwest');
ylim([0 20]);
```

## Simulate Chopper Waveform at Each Duty Cycle

```matlab
Vin = 5;
fsw = 490;
Ts  = 1 / fsw;
duty_cycles = [0.25, 0.50, 0.75];
t = 0:1e-6:4*Ts;

figure;
for i = 1:3
    D   = duty_cycles(i);
    pwm = Vin * double(mod(t, Ts) < D * Ts);
    subplot(3,1,i);
    plot(t*1e3, pwm, 'b', 'LineWidth', 1.5); hold on;
    yline(Vin*D, 'r--', sprintf('V_{AVG}=%.2fV', Vin*D));
    ylim([-0.5, 6]); grid on;
    ylabel('V (V)');
    title(sprintf('D = %d%%  \\rightarrow  V_{AVG} = %.2fV', D*100, Vin*D));
end
xlabel('Time (ms)');
sgtitle('Chopper Waveforms \mdash 490 Hz, V_{IN}=5V');
```

## Prediction Table

| PWM Value | Duty Cycle | Predicted V\_{AVG} (V) | Motor speed |
|-----------|------------|------------------------|-------------|
| 64 | 25% | | |
| 128 | 50% | | |
| 192 | 75% | | |

---

# Experiment 1 - PWM Chopper Waveform

## Objective

Observe chopper operation using Arduino PWM.

---

# Arduino Code

```cpp
void setup()
{
    pinMode(9,OUTPUT);
}

void loop()
{
    analogWrite(9,128);
}
```

---

# Oscilloscope Setup

Probe Tip:

```text
Pin 9
```

Probe Ground:

```text
Arduino GND
```

---

# DSO Nano Settings

Vertical:

```text
2 V/div
```

Horizontal:

```text
500 µs/div
```

Trigger:

```text
Rising Edge
```

---

# Expected Waveform

```text
5V ─────      ─────
         │      │
         │      │
0V ______│______│______
```

---

# Measurements

| Parameter | Expected |
|------------|-----------|
| Frequency | ~490 Hz |
| Duty Cycle | ~50% |
| Peak Voltage | ~5 V |

---

# Experiment 2 - Duty Cycle Investigation

## Test A

```cpp
analogWrite(9,64);
```

Expected Duty Cycle:

```text
25%
```

---

## Test B

```cpp
analogWrite(9,128);
```

Expected Duty Cycle:

```text
50%
```

---

## Test C

```cpp
analogWrite(9,192);
```

Expected Duty Cycle:

```text
75%
```

---

# Results Table

| PWM Value | Duty Cycle | Observation |
|------------|------------|-------------|
| 64 | 25% | |
| 128 | 50% | |
| 192 | 75% | |

---

# Chopper Efficiency

The MOSFET is typically either:

```text
Fully ON
```

or

```text
Fully OFF
```

Therefore:

```text
Switching Losses Are Small
```

compared with linear control.

---

# Industrial Applications

Choppers are used in:

## Electric Vehicles

Battery power conversion.

---

## DC Motor Drives

Speed control.

---

## Railway Traction

Locomotive drives.

---

## Battery Chargers

Efficient regulation.

---

## Renewable Energy Systems

Solar power conversion.

---

# MATLAB Comparison

Now overlay your measured duty cycles and average voltages against the ideal chopper theory, and consolidate all three converter types on one plot.

## Enter Your Measured Values

```matlab
Vin = 5;

D_measured    = [0.25,  0.50,  0.75];   % measured duty cycles
Vavg_measured = [0.00,  0.00,  0.00];   % replace with measured average voltages (V)

D_ideal  = 0:0.01:1;
Vavg_ideal = Vin .* D_ideal;

figure; hold on;
plot(D_ideal, Vavg_ideal, 'b--', 'LineWidth', 2, ...
    'DisplayName', 'Ideal: V_{AVG} = D \cdot V_{IN}');
scatter(D_measured, Vavg_measured, 80, 'r', 'filled', ...
    'DisplayName', 'Measured');
grid on;
xlabel('Duty Cycle'); ylabel('Average Voltage (V)');
title('DC Chopper \mdash Ideal vs Measured');
legend('Location', 'northwest');

% Print efficiency at each operating point
fprintf('%-8s %-12s %-12s %-12s\n', 'D', 'V_ideal(V)', 'V_meas(V)', 'Error(%)');
for i = 1:3
    V_ideal = Vin * D_measured(i);
    err     = 100 * abs(V_ideal - Vavg_measured(i)) / V_ideal;
    fprintf('%-8.2f %-12.3f %-12.3f %-12.1f\n', ...
        D_measured(i), V_ideal, Vavg_measured(i), err);
end
```

## Consolidation Plot — All Three Topologies

```matlab
Vin = 5;
D   = 0:0.001:0.95;

figure; hold on;
plot(D, Vin.*D,          'b',  'LineWidth', 2, 'DisplayName', 'Type A Buck');
plot(D, Vin./(1-D),      'r',  'LineWidth', 2, 'DisplayName', 'Type B Boost');
scatter(D_measured, Vavg_measured, 80, 'gs', 'filled', ...
    'DisplayName', 'Measured (Chopper)');
yline(Vin, 'k:', 'V_{IN}');
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Buck / Boost / Chopper \mdash Unified View');
legend('Location', 'northwest');
ylim([0 20]);
```

## Reflection

- Do your measured average voltages fall on the ideal line?
- The Type A (Buck) and motor chopper curves are identical. What does this tell you about the relationship between a Buck Converter and a DC motor drive?
- Why does the Type B (Boost) curve diverge rapidly from the Type A curve as D increases?

---

# Knowledge Check

## Question 1

What is a chopper converter?

Answer:

```text
____________________
```

---

## Question 2

Why is PWM used in choppers?

Answer:

```text
____________________
```

---

## Question 3

What type of chopper is a Buck Converter?

Answer:

```text
____________________
```

---

## Question 4

What determines the average output voltage?

Answer:

```text
____________________
```

---

## Question 5

Why are chopper converters efficient?

Answer:

```text
____________________
```

Answer:

```text
____________________
```

---

## Question 6

A DC motor drive and a Buck Converter both use the equation VAVG = D × VS. Explain one key circuit difference between them that makes the Buck Converter suitable for powering sensitive electronics while the basic motor chopper is not.

Answer:

```text
____________________
```

---

# Project Summary

In this project you learned:

✅ Chopper converter fundamentals

✅ PWM-based voltage control

✅ Buck and Boost chopper relationships

✅ DC motor drive concepts

✅ Average voltage control

✅ First-quadrant operation

✅ Industrial power electronics terminology

You now understand the broader industrial terminology that connects:

- PWM
- Motor Drives
- Buck Converters
- Boost Converters
- DC-DC Converters

under the common category of:

```text
DC Chopper Converters
```

---

# Next Project

**12_AC_DC_Rectifiers.md**

Topics:

- AC and DC Fundamentals
- Half-Wave Rectification
- Bridge Rectifiers
- Capacitor Smoothing
- Ripple Voltage
