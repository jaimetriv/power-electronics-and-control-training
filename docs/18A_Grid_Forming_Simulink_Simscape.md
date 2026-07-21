# Project 18A - Grid-Forming VSC in Simulink and Simscape Electrical

### Prerequisites

Complete:

- 06_DC_AC_Inverters.md
- 15_Closed_Loop_Buck.md
- 16_Controller_Design.md
- 17_Grid_Following_VSC.md
- 18_Grid_Forming_VSC.md

Software:

- MATLAB
- Simulink
- Simscape Electrical

---

## Objective

In this companion project you will model a grid-forming voltage source converter using:

- Simulink voltage-control and droop-control blocks
- Simscape Electrical inverter and LC filter blocks
- autonomous voltage-generation and load-step tests

This page complements the hardware grid-forming VSC lab.

---

## Why This Is A High-Value Simulation Companion

Grid-forming control is one of the most complex topics in the course because the converter must create:

- voltage magnitude
- frequency
- phase behaviour
- load response

Simulation is especially valuable here because it lets you study voltage-forming behaviour safely before attempting any hardware implementation.

---

## Recommended Workflow

Use three levels:

1. Simulink voltage-reference and control structure
2. Simscape Electrical inverter plus LC filter plant
3. load and droop-response studies in the integrated model

---

## Control Structure

Build a control architecture containing:

1. Internal frequency or angle generator
2. Voltage reference block
3. Error calculation
4. PI voltage controller
5. modulation index limiter
6. SPWM generation
7. inverter and LC filter plant
8. voltage feedback path

Optionally add:

- active-power droop
- reactive-power or voltage droop

---

## Simscape Plant

Use a physical plant containing:

- DC source
- H-bridge inverter
- LC filter
- resistive or mixed load
- voltage sensor
- current sensor
- electrical reference
- solver configuration

Suggested starting values:

- low-voltage DC input
- output reference near the hardware-lab scale
- moderate load such as 100 to 470 ohms

---

## Measurements To Capture

Record:

- output voltage
- output frequency
- modulation index
- load-step response
- overshoot and settling time
- regulation error across load changes

Compare these with the expectations from the main hardware lab and the simplified MATLAB models.

---

## Investigation Tasks

### Task 1 - Voltage Regulation

Apply a fixed reference and observe:

- startup behaviour
- steady-state voltage
- output ripple after filtering

### Task 2 - Load Step

Change the load and observe:

- voltage dip
- recovery time
- controller effort

### Task 3 - Droop Behaviour

Add a droop law and observe:

- frequency change with active power
- voltage change with reactive or load-related demand
- how sharing behaviour would be expected to change in a multi-inverter system

---

## Reflection Questions

1. How does the grid-forming control structure differ fundamentally from the grid-following structure?
2. Which part of the response is most affected by the LC filter?
3. Why is droop easier to understand in simulation before hardware?
4. What is the biggest limitation of the simplified control model compared with the full Simscape plant?

---

## Suggested Extension

After this page, a natural next step is to package the best companion pages into a dedicated Simulink/Simscape learning pathway for the course.

---

## Summary

This companion page helps you:

- model autonomous voltage generation
- test load regulation and droop behaviour
- compare simplified control logic with a physical inverter/filter plant
- prepare for advanced grid-forming experiments with lower risk
