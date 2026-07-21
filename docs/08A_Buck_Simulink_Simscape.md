# Project 08A - Buck Converter in Simulink and Simscape Electrical

### Prerequisites

Complete:

- 00_Introduction.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 08_Buck_Converter.md

Software:

- MATLAB
- Simulink
- Simscape Electrical

---

## Objective

In this companion project you will learn how to model the Buck Converter using:

- Simulink control blocks
- Simscape Electrical power-stage blocks
- ideal and non-ideal components
- parameter sweeps for duty cycle and load

This page is designed to sit alongside the hardware Buck Converter lab.

---

## Why Use Simulink and Simscape Here?

The standard Buck Converter lab teaches:

- switching principles
- duty-cycle control
- inductor and capacitor behaviour
- output ripple measurement

Simulink and Simscape let you extend that into:

- safe pre-hardware testing
- visualising internal currents and voltages
- comparing ideal theory with non-ideal switching losses
- trying load and duty changes quickly

---

## Recommended Workflow

Work in three layers:

1. Start with the ideal Buck equation in MATLAB.
2. Build the controller and PWM structure in Simulink.
3. Build the physical converter in Simscape Electrical.

---

## Model 1 - MATLAB Baseline

Use the ideal Buck relationship:

$$
V_{OUT} = D \cdot V_{IN}
$$

Start with:

- $V_{IN} = 5V$
- $D = 0.25, 0.50, 0.75$

Predict:

- average output voltage
- ideal output trend versus duty cycle

This gives you a reference before physical modeling.

---

## Model 2 - Simulink Control Structure

Build a signal-flow model containing:

1. Constant block for duty cycle
2. Repeating sequence block for carrier waveform
3. Comparator block for PWM generation
4. Scope block for duty and PWM observation

Expected outcome:

- PWM waveform at the chosen switching frequency
- duty-cycle control without physical device detail

Use this stage to verify your PWM logic before connecting a power-stage model.

---

## Model 3 - Simscape Electrical Buck Converter

Build a physical Buck Converter with:

- DC Voltage Source
- MOSFET
- Diode
- Inductor
- Capacitor
- Resistive Load
- Voltage Sensor
- Current Sensor
- Electrical Reference
- Solver Configuration

Suggested starting values:

- $V_{IN} = 5V$
- $L = 100\,\mu H$
- $C = 100\,\mu F$
- $R = 100\,\Omega$
- switching frequency about $490Hz$ for direct comparison with the introductory hardware lab

---

## Measurements To Capture

Record these from simulation:

- PWM waveform
- switch node voltage
- inductor current
- output voltage
- output ripple

Compare them against:

- the ideal equation
- your MATLAB script predictions
- the hardware oscilloscope measurements from Project 08

---

## Investigation Tasks

### Task 1 - Duty Cycle Sweep

Test:

- $D = 0.25$
- $D = 0.50$
- $D = 0.75$

Observe:

- average output voltage
- ripple trend
- inductor current trend

### Task 2 - Load Variation

Change the load resistance and observe:

- output voltage regulation
- current increase
- ripple changes

### Task 3 - Non-Ideal Devices

Add realistic properties where available:

- diode forward voltage
- MOSFET on-state resistance
- capacitor ESR
- inductor series resistance

Observe how the simulated converter departs from the ideal Buck equation.

---

## Reflection Questions

1. How closely does the Simscape output voltage match $V_{OUT} = D \cdot V_{IN}$?
2. Which non-ideal component has the biggest visible effect on low-voltage operation?
3. Does the simulated ripple resemble the ripple seen in the hardware lab?
4. At what point does the simple ideal Buck model become insufficient?

---

## Suggested Extension

After this page, the next high-value simulation companion is:

- 09_Boost_Converter.md
- 15_Closed_Loop_Buck.md

Those two labs benefit even more from Simulink and Simscape because closed-loop and non-ideal effects become more important.

---

## Summary

This companion page adds a simulation-first layer to Project 08.

You should now be able to:

- predict Buck Converter behaviour in MATLAB
- generate PWM logic in Simulink
- build a physical converter in Simscape Electrical
- compare ideal, simulated, and measured behaviour
