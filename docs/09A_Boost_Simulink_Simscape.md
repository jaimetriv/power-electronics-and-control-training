# Project 09A - Boost Converter in Simulink and Simscape Electrical

### Prerequisites

Complete:

- 00_Introduction.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 08_Buck_Converter.md
- 09_Boost_Converter.md

Software:

- MATLAB
- Simulink
- Simscape Electrical

---

## Objective

In this companion project you will model the Boost Converter using:

- MATLAB calculations
- Simulink PWM and control logic
- Simscape Electrical physical converter blocks

This page extends the hardware Boost Converter lab with a simulation-first workflow.

---

## Why Simscape Is Valuable Here

The Boost Converter is more sensitive than the Buck Converter to:

- duty-cycle changes
- diode and switch losses
- inductor current shape
- startup transients

Simscape lets you inspect those effects safely before building the hardware.

---

## Recommended Workflow

Use three layers:

1. MATLAB for the ideal Boost equation
2. Simulink for PWM logic and parameter sweeps
3. Simscape Electrical for the non-ideal power stage

---

## Model 1 - MATLAB Baseline

Start with the ideal relationship:

$$
V_{OUT} = \frac{V_{IN}}{1-D}
$$

Use a starting case such as:

- $V_{IN}=5V$
- $D=0.25, 0.50, 0.75$

Predict:

- ideal output voltage
- how rapidly output voltage rises as duty cycle increases

---

## Model 2 - Simulink PWM Structure

Build a signal-flow model with:

1. Duty cycle command
2. Carrier waveform
3. Comparator
4. Scope blocks

Use this stage to verify the PWM logic independently from the electrical model.

---

## Model 3 - Simscape Electrical Boost Converter

Build a physical model containing:

- DC Voltage Source
- Inductor
- MOSFET
- Diode
- Capacitor
- Resistive Load
- Voltage Sensor
- Current Sensor
- Electrical Reference
- Solver Configuration

Suggested initial values:

- $V_{IN}=5V$
- $L=100\,\mu H$
- $C=100\,\mu F$
- moderate resistive load
- switching frequency about $490Hz$ for consistency with the introductory hardware lab

---

## Measurements To Capture

Record:

- PWM waveform
- switch node voltage
- inductor current
- diode current
- output voltage
- output ripple

Compare simulation against:

- the ideal Boost equation
- MATLAB predictions
- hardware measurements from Project 09

---

## Investigation Tasks

### Task 1 - Duty Sweep

Test multiple duty cycles and compare:

- ideal output voltage
- simulated output voltage
- divergence caused by non-ideal components

### Task 2 - Startup Behaviour

Observe converter startup and note:

- output overshoot
- inductor current ramping
- capacitor charging transient

### Task 3 - Non-Ideal Losses

Include:

- MOSFET on-state resistance
- diode forward voltage
- inductor series resistance
- capacitor ESR

Use the results to explain why measured output is lower than the ideal equation predicts.

---

## Reflection Questions

1. Why does the Boost Converter depart from the ideal model more quickly than the Buck Converter at high duty cycles?
2. Which non-ideal element has the strongest effect at low input voltage?
3. Does the inductor current remain continuous for your chosen operating point?
4. How well does the simulated output ripple match the physical lab?

---

## Suggested Extension

After this page, the next high-value simulation companion is:

- 15A_Closed_Loop_Buck_Simulink_Simscape.md

That companion adds regulation, feedback and disturbance rejection to a converter plant.

---

## Summary

This companion page helps you:

- predict Boost behaviour in MATLAB
- verify PWM structure in Simulink
- study physical converter behaviour in Simscape Electrical
- compare ideal, simulated and measured results
