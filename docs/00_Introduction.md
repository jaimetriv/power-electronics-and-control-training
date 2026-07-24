# Microcontroller Power Electronics and Control Theory Lab

## Author

Jaime T

---

## Purpose

This repository documents a structured learning journey through:

- Electronics
- Embedded Systems
- Microcontroller Programming (Arduino and ESP32)
- Oscilloscope Measurements
- Power Electronics
- Control Theory
- MATLAB Modelling
- Practical Engineering

The goal is to combine:

```text
Theory
+
Simulation
+
Practical Experiments
```

to build a solid foundation in modern electrical and electronic engineering.

---

## Available Equipment

## Hardware

### Controllers

- Arduino Uno
- ESP32 DevKit V1

### SparkFun Inventor's Kit

- Breadboard
- LEDs
- Resistors
- Capacitors
- Transistors
- Potentiometers
- Sensors
- Push Buttons

### Robotics

- Parallax BOE-Bot

### Test Equipment

- OWON HDS272S (baseline)
- DSO Nano Portable Oscilloscope (portable fallback)

### Software

- Arduino IDE
- MATLAB
- Simulink

---

## Course Philosophy

The best way to learn engineering is by combining:

1. Theory
2. Calculations
3. Simulation
4. Measurements
5. Reflection

Each project follows a common core structure, with optional sections added when relevant to the topic:

```text
Objective

Theory

Calculations

Components

Wiring

Implementation

Measurements

MATLAB Exercises

Questions

Summary
```

The purpose is not simply to build projects.

The purpose is to understand:

```text
Why things work
```

and

```text
How to predict their behaviour
```

before building them.

---

## Learning Roadmap

The projects are organised so that each project builds naturally upon the previous one.

---

## Phase 1 - Signals and Fundamental Electronics

The first phase introduces:

- Signals
- Frequency
- PWM
- Capacitors
- Inductors
- Dynamic Systems

---

## Project 1

### PWM Fundamentals and Oscilloscope Measurements

Concepts:

- Frequency
- Period
- Duty Cycle
- PWM
- DSO Nano Measurements
- OWON HDS272S Measurements

File:

```text
01_PWM_Fundamentals.md
```

---

## Project 2

### RC Circuits and Time Constants

Concepts:

- Capacitor Charging
- Capacitor Discharging
- Exponential Response
- Time Constants
- First-Order Systems

File:

```text
02_RC_Circuits.md
```

---

## Project 3

### RLC Circuits and Resonance

Concepts:

- Inductors
- Resonance
- Ringing
- Natural Frequency
- Damping
- Second-Order Systems

File:

```text
03_RLC_Circuits.md
```

---

## Phase 2 - Power Electronics Fundamentals

The second phase introduces the foundation of modern power electronics.

---

## Project 4

### MOSFET Fundamentals and Electronic Switching

Concepts:

- MOSFETs
- Gate Control
- Electronic Switching
- PWM Power Control

File:

```text
04_MOSFET_Fundamentals.md
```

---

## Project 5

### PWM Motor Control

Concepts:

- DC Motors
- First-Order Systems
- Motor Time Constants
- Open Loop Speed Control

File:

```text
10_PWM_Motor_Control.md
```

---

## Phase 3 - Control Systems

The third phase introduces feedback control.

---

## Project 6

### P Controller

Concepts:

- Error
- Feedback
- Gain

---

## Project 7

### PI Controller

Concepts:

- Integral Action
- Steady-State Error

---

## Project 8

### PID Controller

Concepts:

- Derivative Action
- Stability
- Tuning

---

## Phase 4 - Power Electronics

The fourth phase combines everything learned so far.

---

## Project 9

### Buck Converter

Concepts:

- Energy Transfer
- Switching Power Supplies
- Output Ripple

---

## Project 10

### Closed-Loop Buck Converter

Concepts:

- Voltage Regulation
- PI Control
- Feedback Systems

---

## Project 11

### Boost Converter

Concepts:

- Voltage Step-Up
- Energy Storage
- Converter Efficiency

---

## Project 11B

### DC Chopper Converters

Concepts:

- Chopper Operation
- DC Motor Drives
- Quadrant Operation

---

## Project 12

### AC-DC Rectifiers

Concepts:

- Half-Wave Rectification
- Bridge Rectifiers
- Capacitor Smoothing

---

## Project 13

### DC-AC Inverters

Concepts:

- H-Bridge Circuits
- SPWM
- AC Generation

---

## Phase 5 - Advanced Topics

The final phase focuses on modelling, design and grid-connected systems.

---

## Project 14

### System Identification

Concepts:

- Experimental Modelling
- Parameter Estimation
- Transfer Functions

---

## Project 15

### Controller Design

Concepts:

- P Controllers
- PI Controllers
- PID Controllers
- Closed-Loop Analysis

---

## Project 16

### Grid-Following VSC

Concepts:

- PLL Synchronisation
- Current Control
- dq Control

---

## Project 17

### Grid-Forming VSC

Concepts:

- Autonomous AC Generation
- Voltage Regulation
- Droop Control

---

## Mathematical Toolbox

The following equations will appear repeatedly throughout this repository.

---

## Ohm's Law

$$
V = I \cdot R
$$

Where:

- $V$ = Voltage (V)
- $I$ = Current (A)
- $R$ = Resistance (Ω)

---

## Electrical Power

$$
P = V \cdot I
$$

Where:

- $P$ = Power (W)
- $V$ = Voltage (V)
- $I$ = Current (A)

For DC systems (or instantaneous power):

$$
p(t) = v(t)i(t)
$$

For sinusoidal AC average real power:

$$
P = V_{rms}I_{rms}\cos(\phi)
$$

---

## Frequency

$$
f = \frac{1}{T}
$$

Where:

- $f$ = Frequency (Hz)
- $T$ = Period (s)

---

## Duty Cycle

$$
D = \frac{T_{ON}}{T}
$$

Where:

- $D$ = Duty Cycle
- $T_{ON}$ = Time signal is HIGH
- $T$ = Total period

---

## PWM Average Voltage

$$
V_{AVG} = D \cdot V_S
$$

Where:

- $V_{AVG}$ = Average Voltage
- $D$ = Duty Cycle
- $V_S$ = Supply Voltage

---

## Capacitor Energy

$$
E = \frac{1}{2}CV^2
$$

Where:

- $E$ = Energy (J)
- $C$ = Capacitance (F)
- $V$ = Voltage (V)

---

## Inductor Energy

$$
E = \frac{1}{2}LI^2
$$

Where:

- $E$ = Energy (J)
- $L$ = Inductance (H)
- $I$ = Current (A)

---

## RC Time Constant

$$
\tau = RC
$$

Where:

- $\tau$ = Time Constant (s)
- $R$ = Resistance (Ω)
- $C$ = Capacitance (F)

---

## RL Time Constant

$$
\tau = \frac{L}{R}
$$

Where:

- $\tau$ = Time Constant (s)
- $L$ = Inductance (H)
- $R$ = Resistance (Ω)

---

## Natural Frequency

$$
\omega_n = \frac{1}{\sqrt{LC}}
$$

Where:

- $\omega_n$ = Natural Frequency (rad/s)
- $L$ = Inductance (H)
- $C$ = Capacitance (F)

---

## Damping Ratio

$$
\zeta = \frac{R}{2}\sqrt{\frac{C}{L}}
$$

Where:

- $\zeta$ = Damping Ratio

This form corresponds to the standard series RLC second-order model used in this course.

---

## PID Controller

$$
u(t)=K_Pe(t)+K_I\int e(t)\,dt+K_D\frac{de(t)}{dt}
$$

Where:

- $K_P$ = Proportional Gain
- $K_I$ = Integral Gain
- $K_D$ = Derivative Gain
- $e(t)$ = Error Signal

---

## Using the Oscilloscope (OWON HDS272S Baseline)

The OWON HDS272S will be used throughout this repository to measure:

- PWM signals
- RC charging curves
- RC discharging curves
- Oscillations
- Resonance
- Ringing
- MOSFET gate signals
- Motor drive signals
- Converter ripple
- Closed-loop responses

The oscilloscope is one of the most important learning tools in this course.

If needed, the same procedures can be followed using the DSO Nano as a fallback scope.

Theory should always be compared with:

```text
Measured Reality
```

---

## Recommended Workflow

For every project:

1. Read the theory.
2. Complete the calculations.
3. Simulate in MATLAB.
4. Predict the outcome.
5. Build the circuit.
6. Measure the response.
7. Compare simulation, measurements and theory.
8. Explain any differences.

This workflow mirrors how real engineering projects are carried out.

---

## Final Learning Objectives

After completing all projects you should be capable of:

✅ Using an oscilloscope confidently

✅ Understanding first-order systems

✅ Understanding second-order systems

✅ Measuring time constants

✅ Measuring natural frequencies

✅ Understanding resonance

✅ Understanding damping

✅ Using MOSFETs correctly

✅ Designing PWM systems

✅ Implementing control systems

✅ Building Buck converters

✅ Building Boost converters

✅ Performing MATLAB analysis

✅ Designing simple closed-loop controllers

✅ Understanding the fundamentals of power electronics

---

## Repository Structure

```text
00_Introduction.md

00A_Microcontroller_Familiarisation.md

00B_Oscilloscope_Familiarisation.md

00C_WiFi_Controller_Familiarisation.md

01_PWM_Fundamentals.md

02_RC_Circuits.md

03_RLC_Circuits.md

04_MOSFET_Fundamentals.md

10_PWM_Motor_Control.md

12_P_Controller.md

13_PI_Controller.md

14_PID_Controller.md

08_Buck_Converter.md

15_Closed_Loop_Buck.md

09_Boost_Converter.md

07_DC_Chopper_Converters.md

05_AC_DC_Rectifiers.md

06_DC_AC_Inverters.md

11_System_Identification.md

16_Controller_Design.md

17_Grid_Following_VSC.md

18_Grid_Forming_VSC.md
```

---

## Let's Begin

The first project introduces the fundamental concept behind most modern power electronic systems:

**Pulse Width Modulation (PWM)**

Proceed to:

```text
01_PWM_Fundamentals.md
```
