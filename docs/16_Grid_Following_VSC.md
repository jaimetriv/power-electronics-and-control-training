# Project 16 - Grid-Following Voltage Source Converter (VSC)

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
- 11B_DC_Chopper_Converters.md
- 12_AC_DC_Rectifiers.md
- 13_DC_AC_Inverters.md
- 14_System_Identification.md
- 15_Controller_Design.md

---

# Objective

In this project you will learn:

- What a Grid-Following Converter is
- Why synchronization is required
- How a Phase Locked Loop (PLL) works
- How current is injected into an AC system
- How SPWM controls an inverter
- How current control loops work
- How dq control simplifies AC control
- How modern solar and battery inverters operate

This is the capstone project for the course.

---

# Safety Notice

## Important

This project:

```text
MUST NOT
```

be connected directly to mains power.

All experiments must use:

```text
Low Voltage AC Sources
```

such as:

- Function generators
- Isolated AC laboratory supplies
- Signal generators

Recommended AC test voltage:

```text
1 V to 10 V RMS
```

---

# Learning Outcomes

At the end of this project you should be able to:

✅ Explain Grid-Following Operation

✅ Explain PLL Synchronization

✅ Explain Current Injection

✅ Design a Current Controller

✅ Implement PI Regulation

✅ Generate SPWM

✅ Understand dq Control

✅ Understand Modern Renewable Energy Converters

---

# Introduction

Most modern renewable energy systems use:

```text
Grid-Following
```

converters.

Examples:

- Solar Inverters
- Battery Energy Storage Systems
- EV Chargers
- Grid-Tied Converters

---

# What Is a Grid-Following Converter?

A Grid-Following Converter does not create the grid voltage.

Instead:

```text
The Grid Creates Voltage

The Converter Injects Current
```

---

# Why Current Control?

The grid already establishes:

- Voltage magnitude
- Frequency
- Phase angle

The inverter therefore controls:

```text
Current
```

rather than voltage.

---

# Power Transfer

Real power is:

$$
P = VI\cos(\phi)
$$

Where:

- $V$ = Grid Voltage
- $I$ = Grid Current
- $\phi$ = Phase Difference

---

# Power Flow Example

If:

```text
Voltage and Current
```

are in phase:

$$
\phi=0
$$

then:

$$
P=VI
$$

Maximum real power is transferred.

---

# Overall Control Structure

```text
Grid Voltage
       ↓
      PLL
       ↓
 Grid Angle θ
       ↓
 Current Controller
       ↓
     SPWM
       ↓
   Inverter
       ↓
    Filter
       ↓
      Grid
```

---

# Hardware Overview

The laboratory setup consists of:

```text
AC Source
```

+

```text
Measurement System
```

+

```text
Controller
```

+

```text
Inverter
```

+

```text
Filter
```

---

# Recommended Hardware

## Controller

Recommended:

- ESP32
- STM32 Nucleo

Acceptable:

- Arduino Mega

---

## Oscilloscope

- DSO Nano
- FNIRSI Scope
- Bench Oscilloscope

---

## Signal Generator

Used as the simulated grid.

Examples:

- FY6900
- JDS6600
- Function Generator

---

## Current Sensor

Recommended:

- ACS712
- ACS758

---

## Voltage Measurement

Recommended:

- Resistor Divider
- Isolation Amplifier (Advanced)

---

## Inverter Stage

- MOSFET H-Bridge
- MOSFET Driver

Examples:

- IR2104
- IR2110

---

## Filter

Recommended:

```text
L Filter
```

for first implementation.

Typical:

```text
1 mH to 5 mH
```

---

# Hardware Purchasing Checklist

## Essential

- ESP32 Development Board
- Function Generator
- Current Sensor
- MOSFET Driver
- MOSFET H-Bridge
- Inductor
- Breadboard or Prototype PCB

---

## Recommended

- Differential Probe
- External Power Supply
- Bench Oscilloscope

---

# System Schematic

```text
Function Generator
        │
        ▼
 Grid Voltage

        │
 ┌──────┴──────┐
 │             │
 ▼             ▼

PLL      Voltage Sensor

 │
 ▼

Current Controller

 │
 ▼

SPWM Generator

 │
 ▼

H-Bridge Inverter

 │
 ▼

L Filter

 │
 ▼

Current Sensor

 │
 ▼

Simulated Grid
```

---

# Concept of Synchronization

Before current can be injected:

```text
Grid Position
```

must be known.

---

# Grid Voltage

Assume:

$$
v(t)=V_m\sin(\omega t)
$$

The controller must determine:

- Frequency
- Phase
- Zero Crossings

---

# Phase Locked Loop (PLL)

A PLL estimates:

$$
\theta
$$

where:

$$
\theta=\omega t
$$

---

# PLL Purpose

The PLL continuously estimates:

```text
Grid Angle
```

and:

```text
Grid Frequency
```

---

# Why Is The PLL Important?

Without synchronization:

```text
Current Injection
```

will occur at the wrong phase angle.

This can result in:

- Poor power transfer
- Instability
- Excessive current

---

# Simplified PLL Block Diagram

```text
Grid Voltage
       ↓
 Phase Detector
       ↓
 PI Controller
       ↓
 Frequency Estimate
       ↓
 Integrator
       ↓
 Grid Angle θ
```

---

# Review of PI Controllers

From earlier projects:

$$
u(t)
=
K_Pe(t)
+
K_I
\int e(t)\,dt
$$

The PLL itself contains a PI controller.

---

# Grid Angle

The PLL produces:

$$
\theta
$$

This angle is used throughout the controller.

---

# Why Use dq Control?

AC currents are sinusoidal.

Sinusoids are difficult to regulate directly.

---

# dq Transformation

The dq transform converts:

```text
Sinusoidal Signals
```

into approximately:

```text
DC Signals
```

---

# Example

Current:

$$
i(t)=10\sin(\omega t)
$$

becomes approximately:

```text
Id = 10

Iq = 0
```

which is easier to regulate.

---

# Current Reference

Example:

```text
Inject 1 A
```

---

# Current Error

The current controller calculates:

$$
e
=
I_d^*
-
I_d
$$

Where:

- $I_d^*$ = Reference Current
- $I_d$ = Measured Current

---

# Current PI Controller

The controller output is:

$$
u
=
K_Pe
+
K_I\int e\,dt
$$

---

# SPWM Generation

The controller output is converted into:

```text
Sinusoidal PWM
```

for the inverter.

---

# Inverter Stage

The inverter converts:

```text
DC
```

into:

```text
Controlled AC
```

using:

- H-Bridge
- MOSFETs
- SPWM

---

# Output Filter

The inverter output is PWM.

An inductor smooths the current.

---

# Why Is The Filter Required?

Without a filter:

```text
Large PWM Ripple
```

would be injected into the grid.

---

# L Filter

Simplified structure:

```text
Inverter
    │
    L
    │
 Grid
```

---

# Current Measurement

Current feedback is essential.

Possible sensors:

## ACS712

Low cost.

---

## ACS758

Higher current capability.

---

# Control Loop Summary

```text
Measure Grid Voltage
           ↓
          PLL
           ↓
      Angle θ
           ↓
     Current Error
           ↓
     PI Controller
           ↓
          SPWM
           ↓
       Inverter
           ↓
        Filter
           ↓
 Inject Current
```

---

# Experiment 1 - PLL Observation

## Objective

Measure grid phase angle.

---

# Procedure

Generate:

```text
50 Hz Sine Wave
```

using the function generator.

Observe:

```text
Zero Crossings
```

and:

```text
PLL Tracking
```

---

# Experiment 2 - SPWM Generation

## Objective

Create sinusoidal PWM.

---

# Observe

Measure:

- PWM Frequency
- Modulation Index
- Duty Cycle Variation

---

# Experiment 3 - Inverter Output

## Objective

Measure filtered inverter voltage.

---

# Measurements

Record:

| Parameter | Value |
|-----------|-------|
| PWM Frequency | |
| Grid Frequency | |
| RMS Voltage | |
| Peak Voltage | |

---

# Experiment 4 - Current Control

## Objective

Regulate injected current.

---

# Setpoint Tests

```text
0.5 A

1.0 A

1.5 A
```

---

# Results Table

| Current Reference | Measured Current |
|------------------|------------------|
| 0.5 A | |
| 1.0 A | |
| 1.5 A | |

---

# MATLAB Exercise

Generate a synchronized current reference.

```matlab
t = 0:0.0001:0.1;

theta = 2*pi*50*t;

i_ref = sin(theta);

plot(t,i_ref,'LineWidth',2)

grid on

xlabel('Time (s)')
ylabel('Current Reference')

title('Grid Synchronized Current')
```

---

# Expected Result

Current reference should match:

```text
50 Hz
```

grid frequency.

---

# Engineering Applications

Grid-following VSCs are used in:

## Solar Inverters

Grid-connected photovoltaic systems.

---

## Battery Storage

Energy storage integration.

---

## EV Chargers

Bidirectional charging systems.

---

## Renewable Energy Systems

Grid support and power conversion.

---

## HVDC Systems

Large-scale power transmission.

---

# Knowledge Check

## Question 1

What does a grid-following converter control?

Answer:

```text
____________________
```

---

## Question 2

Why is a PLL required?

Answer:

```text
____________________
```

---

## Question 3

Why is current control used instead of voltage control?

Answer:

```text
____________________
```

---

## Question 4

What is the purpose of the output filter?

Answer:

```text
____________________
```

---

## Question 5

Why is dq control useful?

Answer:

```text
____________________
```

---

# Common Mistakes

## PLL Not Locking

Check:

- Signal quality
- Frequency measurement
- PI gains

---

## Excessive Current Ripple

Check:

- Filter inductance
- PWM frequency

---

## Unstable Current Control

Check:

- Controller gains
- Current sensor calibration

---

## Poor Synchronization

Check:

- Phase estimation
- Sampling rate

---

# Troubleshooting Checklist

✅ Grid signal available

✅ PLL locked

✅ SPWM operating

✅ H-Bridge switching correctly

✅ Filter installed

✅ Current sensor operating

✅ Current tracking reference

✅ Stable system operation

---

# Final Course Summary

This project combines:

✅ PWM

✅ MOSFET Switching

✅ Inverters

✅ PI Controllers

✅ Signal Processing

✅ Control Systems

✅ System Identification

✅ Power Electronics

✅ AC Systems

✅ Renewable Energy Concepts

into a complete modern converter control architecture.

You have now progressed from basic PWM generation to the same fundamental control structure used in modern:

- Solar Inverters
- Battery Energy Storage Systems
- EV Chargers
- Utility-Scale Converters
- Grid Support Systems

and have completed the full introductory power electronics and control engineering pathway.
