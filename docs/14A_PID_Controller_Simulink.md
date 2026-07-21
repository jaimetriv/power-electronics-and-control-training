# Project 14A - PID Control in Simulink

### Prerequisites

Complete:

- 10_PWM_Motor_Control.md
- 12_P_Controller.md
- 13_PI_Controller.md
- 14_PID_Controller.md

Software:

- MATLAB
- Simulink

---

## Objective

In this companion project you will extend the control model to PID and study how derivative action affects damping, overshoot and settling.

This page complements the hardware PID control lab.

---

## Why Simulink Is Valuable Here

PID control is easier to reason about in block-diagram form before tuning on hardware.

Simulink helps you study:

- proportional, integral and derivative contributions separately
- overshoot reduction
- damping improvement
- noise sensitivity of derivative action
- the trade-off between response speed and stability

---

## Model Structure

Build a closed-loop model with:

1. Reference input
2. Error summing junction
3. PID controller block
4. Motor plant block
5. Feedback path
6. Scope blocks for output and controller effort

Use the same motor plant used in the earlier controller companion pages.

---

## Suggested Starting Parameters

Start from a working PI controller and add a small derivative term.

Observe how response changes before making larger adjustments.

---

## Measurements To Capture

Record:

- rise time
- overshoot
- settling time
- steady-state error
- controller output smoothness

Compare against the hardware behaviour in Project 14.

---

## Investigation Tasks

### Task 1 - Compare P, PI and PID

Run all three controllers on the same plant.

Observe differences in:

- overshoot
- damping
- settling time
- final accuracy

### Task 2 - Derivative Gain Sweep

Increase derivative action gradually.

Observe:

- reduced overshoot
- stronger damping
- excessive sensitivity if derivative gain becomes too large

### Task 3 - Noise Sensitivity

Add measurement noise or a noisy feedback signal.

Observe how the derivative term reacts and why practical derivative filtering is often necessary.

---

## Reflection Questions

1. Why can PID be both faster and less oscillatory than PI when tuned well?
2. What is the main practical drawback of derivative action?
3. How does noise change your view of ideal PID tuning?
4. How closely does the Simulink model explain the hardware trends?

---

## Suggested Extension

After this companion page, the next natural step is:

- 16_Controller_Design.md

That project uses the identified plant and controller ideas in a broader design workflow.

---

## Summary

This companion page helps you:

- compare P, PI and PID clearly
- understand derivative action visually
- study damping and noise trade-offs
- prepare for controller-design and advanced power-electronics projects
