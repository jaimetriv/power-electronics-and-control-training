# Simulation Track Overview

## Purpose

This page introduces the Simulink and Simscape Electrical companion track for the course.

The main course remains hardware-first.

The simulation track exists to help you:

- validate theory before wiring hardware
- understand internal signals that are difficult to probe directly
- compare ideal and non-ideal behaviour
- test controller ideas before hardware implementation
- connect equations, block diagrams and physical models

---

## Three Modelling Layers

The course now supports three complementary modelling layers:

1. MATLAB scripts
2. Simulink control and signal-flow models
3. Simscape Electrical physical models

Use them as follows:

### MATLAB

Best for:

- equations
- parameter sweeps
- plotting
- curve fitting
- quick theoretical checks

### Simulink

Best for:

- block-diagram control systems
- P, PI and PID loops
- PWM logic
- signal routing
- saturation and anti-windup studies

### Simscape Electrical

Best for:

- converter power stages
- motors and electromechanical plants
- switching behaviour
- current and voltage sensing
- filter dynamics
- non-ideal component effects

---

## Recommended Learning Strategy

Use the simulation track in this order:

1. Read the main hardware lab first.
2. Use MATLAB to predict the expected behaviour.
3. Use Simulink to understand the control or PWM structure.
4. Use Simscape Electrical to study the physical plant.
5. Compare simulation against the measured hardware results.

This keeps simulation grounded in the lab objectives rather than turning into a disconnected software exercise.

---

## Current Companion Pages

### Power Conversion

- 08A_Buck_Simulink_Simscape.md
- 09A_Boost_Simulink_Simscape.md
- 15A_Closed_Loop_Buck_Simulink_Simscape.md

### Motors and Control

- 10A_Motor_Simulink_Simscape.md
- 12A_P_Controller_Simulink.md
- 13A_PI_Controller_Simulink.md
- 14A_PID_Controller_Simulink.md

### Advanced Grid Converters

- 17A_Grid_Following_Simulink_Simscape.md
- 18A_Grid_Forming_Simulink_Simscape.md

---

## Where Simscape Adds The Most Value

The highest-value simulation labs are usually:

1. Buck Converter
2. Boost Converter
3. PWM Motor Control
4. Closed-Loop Buck Control
5. Grid-Following VSC
6. Grid-Forming VSC

These are the topics where non-ideal behaviour, energy storage and control interactions matter most.

---

## Expected Outcome

If you follow both tracks together, you should be able to move between:

```text
Theory
↓
Simulation
↓
Hardware
```

with much stronger intuition and less trial-and-error.

---

## Summary

The simulation track is not a replacement for the labs.

It is a parallel framework that makes the hardware work:

- safer
- more predictable
- easier to explain
- easier to extend into advanced topics
