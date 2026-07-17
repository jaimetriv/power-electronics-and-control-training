# Project 11B - DC Chopper Converters and DC Motor Drives

## Prerequisites

Complete:

- 00_Introduction.md
- 00A_DSO_Nano_Familiarisation.md
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

# MATLAB Exercise

Plot output voltage versus duty cycle.

```matlab
D = 0:0.01:1;

Vin = 12;

Vout = D .* Vin;

plot(D,Vout,'LineWidth',2)

grid on

xlabel('Duty Cycle')
ylabel('Output Voltage (V)')

title('DC Chopper Output Voltage')
```

---

# Expected Result

The graph should be linear according to:

$$
V_{OUT}=D \cdot V_{IN}
$$

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

**12_System_Identification.md**

Topics:

- Experimental Modelling
- Transfer Functions
- First-Order Models
- Second-Order Models
- Parameter Estimation
- Model Validation