# Project 17A - Grid-Following VSC in Simulink and Simscape Electrical

### Prerequisites

Complete:

- 06_DC_AC_Inverters.md
- 15_Closed_Loop_Buck.md
- 16_Controller_Design.md
- 17_Grid_Following_VSC.md

Software:

- MATLAB
- Simulink
- Simscape Electrical

---

## Objective

In this companion project you will model a grid-following voltage source converter using:

- Simulink PLL and dq current-control blocks
- Simscape Electrical inverter, filter and measurement blocks
- current-reference tracking and synchronization tests

This page complements the hardware grid-following VSC lab.

---

## Why This Is A High-Value Simulation Companion

Grid-following control combines several difficult subsystems:

- PLL synchronization
- current control
- PWM generation
- inverter switching
- filter dynamics

Simulation lets you study those interactions without risking the hardware power stage.

---

## Recommended Workflow

Use three levels:

1. Simulink-only control blocks for PLL and current loop logic
2. Simscape Electrical inverter and filter plant
3. integrated tests for synchronization and current injection

---

## Control Structure

Build a control architecture containing:

1. Grid-voltage measurement
2. PLL block for angle estimation
3. abc to dq transformation
4. current reference generator
5. PI current controller
6. dq to abc reconstruction or modulation path
7. SPWM generator
8. inverter and L filter plant

---

## Simscape Plant

Use a physical plant containing:

- DC source
- H-bridge inverter
- L filter
- grid voltage source
- current sensor
- voltage sensor
- electrical reference
- solver configuration

Suggested first study:

- low-voltage simulated grid
- single current-reference step
- nominal filter inductance around 1 mH

---

## Measurements To Capture

Record:

- PLL angle estimate
- grid voltage and inverter current
- current tracking response
- modulation index or PWM duty evolution
- settling time after current-reference changes

Compare them with the simplified MATLAB/transfer-function expectations from the main lab.

---

## Investigation Tasks

### Task 1 - PLL Locking

Apply a sinusoidal grid source and observe:

- lock time
- phase tracking quality
- effect of small frequency error

### Task 2 - Current Reference Step

Apply a current-reference step and observe:

- rise time
- overshoot
- steady tracking quality

### Task 3 - Non-Ideal Effects

Include practical effects such as:

- dead time
- sensor delay
- finite switching frequency
- inductor resistance

Use these to explain differences between ideal control and physical behaviour.

---

## Reflection Questions

1. Which part of the response is dominated by the PLL and which by the current loop?
2. How does filter inductance change current ripple and control speed?
3. Why is a pure control-block model less informative than the combined Simscape plant?
4. What failure mode appears first when synchronization quality degrades?

---

## Suggested Extension

Continue with:

- 18A_Grid_Forming_Simulink_Simscape.md

That companion shows the transition from current-following behaviour to autonomous voltage-forming behaviour.

---

## Summary

This companion page helps you:

- model PLL-based synchronization in Simulink
- connect it to a physical inverter and filter in Simscape
- study current injection safely before hardware
- understand the dynamic interaction of control and power stage
