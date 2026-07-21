# Project 13A - PI Control in Simulink

### Prerequisites

Complete:

- 10_PWM_Motor_Control.md
- 12_P_Controller.md
- 13_PI_Controller.md

Software:

- MATLAB
- Simulink

---

## Objective

In this companion project you will extend the P control model into a PI controller and study how integral action removes steady-state error.

This page complements the hardware PI control lab.

---

## Why Simulink Is Valuable Here

PI control introduces state accumulation through the integral term.

Simulink makes it easy to visualise:

- proportional contribution
- integral accumulation
- steady-state error removal
- slower settling or higher overshoot
- integrator windup risk

---

## Model Structure

Build a closed-loop system containing:

1. Reference input
2. Error summing junction
3. PI controller block or separate gain plus integrator blocks
4. First-order motor plant
5. Feedback path
6. Scope blocks for output, error and controller effort

Suggested plant form:

$$
G(s)=\frac{K}{\tau s+1}
$$

---

## Suggested Starting Parameters

Example starting values:

- $K=1$
- $\tau=0.5s$
- modest $K_P$
- small $K_I$

Increase $K_I$ gradually and observe the change.

---

## Measurements To Capture

Record:

- rise time
- overshoot
- settling time
- steady-state error
- controller output trend

Compare against the hardware response in Project 13.

---

## Investigation Tasks

### Task 1 - Compare P Versus PI

Run both controllers with the same plant.

Observe:

- P control steady-state error
- PI control steady-state correction
- any change in overshoot and settling time

### Task 2 - Integral Gain Sweep

Increase $K_I$ and observe:

- faster error elimination
- increased overshoot risk
- oscillatory behaviour if too aggressive

### Task 3 - Windup Awareness

Add actuator saturation and observe how the integrator behaves.

Optionally add a simple anti-windup limit for comparison.

---

## Reflection Questions

1. Why does integral action eliminate steady-state error?
2. Why can a large $K_I$ create oscillation or overshoot?
3. How does saturation make integral action more difficult to manage?
4. How well does the PI simulation predict your hardware trends?

---

## Suggested Extension

Continue with:

- 14A_PID_Controller_Simulink.md

That companion shows how derivative action can improve damping and reduce overshoot.

---

## Summary

This companion page helps you:

- see how PI control builds on P control
- visualise integral error accumulation
- study windup and saturation effects
- compare P and PI behaviour before hardware tuning
