# Project 10A - PWM Motor Control in Simulink and Simscape Electrical

### Prerequisites

Complete:

- 01_PWM_Fundamentals.md
- 04_MOSFET_Fundamentals.md
- 10_PWM_Motor_Control.md

Software:

- MATLAB
- Simulink
- Simscape Electrical

---

## Objective

In this companion project you will model the PWM-driven DC motor using:

- MATLAB first-order approximations
- Simulink control and signal-flow blocks
- Simscape Electrical electromechanical motor blocks

This page complements the hardware motor lab and bridges the gap between simple first-order theory and a more physical motor model.

---

## Why This Companion Matters

Project 10 introduces the motor as your first real dynamic plant.

The hardware lab shows:

- PWM speed control
- MOSFET switching
- gradual speed rise
- first-order approximation

Simulink and Simscape let you extend that by exploring:

- the difference between electrical and mechanical dynamics
- PWM ripple versus average behaviour
- load torque effects
- motor inertia and friction
- where the first-order approximation breaks down

---

## Recommended Workflow

Use three levels:

1. MATLAB for the reduced first-order motor model
2. Simulink for PWM and signal flow
3. Simscape Electrical for the electromechanical motor plant

---

## Model 1 - MATLAB First-Order Approximation

Begin with the same simplified model used in the main lab:

$$
G(s)=\frac{K}{\tau s + 1}
$$

Use this model to predict:

- rise time
- time constant
- steady-state speed scaling with duty cycle

This gives you a quick baseline before building the physical model.

---

## Model 2 - Simulink PWM and Average-Value Structure

Build a Simulink model containing:

1. Duty-cycle command block
2. Carrier waveform
3. Comparator for PWM
4. Average-voltage view of the motor input
5. Scope blocks for duty, PWM and response

Use this stage to separate:

- PWM generation logic
- average input voltage behaviour
- plant response

---

## Model 3 - Simscape Electrical Motor Plant

Build a physical motor-drive model with:

- DC Voltage Source
- MOSFET switch or controlled power stage
- Flyback diode
- DC Motor block
- Rotational inertia if needed
- Viscous friction or load torque
- Electrical Reference
- Mechanical Rotational Reference
- Voltage and current sensing
- Solver Configuration

Suggested first study:

- fixed DC supply
- PWM input to the switch
- unloaded motor first
- then add load torque

---

## Measurements To Capture

Record:

- PWM waveform
- average motor voltage
- armature current
- speed response
- rise time
- approximate time constant

Compare them against:

- the first-order MATLAB model
- the measured motor response from Project 10

---

## Investigation Tasks

### Task 1 - Duty Cycle Sweep

Try several duty cycles and compare:

- average voltage
- final speed
- rise time differences

### Task 2 - Load Torque Variation

Add load torque and observe:

- reduced steady-state speed
- slower acceleration
- increased current

### Task 3 - First-Order Approximation Versus Physical Model

Compare the simplified first-order model against the Simscape motor.

Look for:

- delay-like effects
- nonlinearities
- current transients not visible in the reduced model

---

## Reflection Questions

1. How well does the first-order model capture the Simscape motor response?
2. Which effects appear in Simscape but not in the simple transfer-function model?
3. How does load torque change the response compared with the unloaded case?
4. Why is the first-order model still useful even if it is incomplete?

---

## Suggested Extension

After this companion page, the next logical simulation pages are:

- 11_System_Identification.md
- 12_P_Controller.md
- 13_PI_Controller.md
- 14_PID_Controller.md

Those projects build directly on the idea of identifying and controlling the motor as a plant.

---

## Summary

This companion page helps you:

- connect PWM motor hardware with simulation
- compare reduced-order and physical models
- explore load and inertia effects safely
- prepare for later controller-design labs
