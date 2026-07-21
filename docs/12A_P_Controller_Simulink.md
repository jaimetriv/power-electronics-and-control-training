# Project 12A - P Control in Simulink

### Prerequisites

Complete:

- 10_PWM_Motor_Control.md
- 12_P_Controller.md

Software:

- MATLAB
- Simulink

---

## Objective

In this companion project you will model a proportional controller using Simulink and apply it to the motor plant introduced earlier in the course.

This page complements the hardware P control lab.

---

## Why Simulink Is Useful Here

P control is the best point to introduce control-block modeling because the structure is simple and the effects are easy to interpret.

You can use Simulink to study:

- error calculation
- proportional gain scaling
- closed-loop response
- steady-state error
- disturbance sensitivity

before tuning on hardware.

---

## Model Structure

Build a closed-loop model containing:

1. Reference input
2. Summing junction for error
3. Gain block for $K_P$
4. Plant block for the motor model
5. Feedback path
6. Scope blocks for output and error

Use a first-order motor model such as:

$$
G(s)=\frac{K}{\tau s+1}
$$

---

## Suggested Starting Parameters

Start with a normalised plant such as:

- $K=1$
- $\tau=0.5s$

Then test several values of $K_P$.

---

## Measurements To Capture

Record:

- rise time
- steady-state value
- steady-state error
- overshoot, if any

Compare these with the hardware behaviour observed in Project 12.

---

## Investigation Tasks

### Task 1 - Gain Sweep

Try low, medium and high values of $K_P$.

Observe:

- faster response as gain increases
- reduced steady-state error
- risk of overshoot or oscillation at higher gain

### Task 2 - Disturbance Sensitivity

Apply a disturbance or output offset and observe how the P-only controller responds.

### Task 3 - Saturation Awareness

Add a saturation block to represent PWM or actuator limits.

Observe how response differs from the unsaturated model.

---

## Reflection Questions

1. Why does P control usually leave steady-state error?
2. How does increasing $K_P$ improve speed but also increase risk?
3. How does actuator saturation change the interpretation of gain tuning?
4. How closely does the Simulink result match the hardware response?

---

## Suggested Extension

Continue with:

- 13A_PI_Controller_Simulink.md

That companion shows how integral action removes the residual steady-state error left by P control.

---

## Summary

This companion page helps you:

- visualise the P control loop
- tune $K_P$ systematically
- understand steady-state error in a closed-loop model
- compare simulation with hardware behaviour
