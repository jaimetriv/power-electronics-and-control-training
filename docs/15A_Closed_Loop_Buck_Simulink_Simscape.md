# Project 15A - Closed-Loop Buck Control in Simulink and Simscape Electrical

### Prerequisites

Complete:

- 08_Buck_Converter.md
- 12_P_Controller.md
- 13_PI_Controller.md
- 14_PID_Controller.md
- 15_Closed_Loop_Buck.md

Software:

- MATLAB
- Simulink
- Simscape Electrical

---

## Objective

In this companion project you will build a closed-loop Buck Converter model using:

- Simulink controller blocks
- Simscape Electrical converter plant blocks
- load-step disturbance testing
- PI tuning and comparison against hardware

This page complements the hardware closed-loop Buck lab.

---

## Why This Is A High-Value Simulation Lab

Closed-loop converter work is where simulation becomes especially useful because you can test:

- feedback polarity
- controller gains
- duty-cycle saturation
- disturbance rejection
- non-ideal component effects

before applying them to hardware.

---

## Recommended Workflow

Use three levels:

1. MATLAB for a simplified plant and expected regulation behaviour
2. Simulink for the closed-loop control structure
3. Simscape Electrical for the non-ideal Buck Converter plant

---

## Control Structure

Build a control loop with:

1. Reference voltage block
2. Summing junction for error
3. PI controller
4. Duty-cycle saturation block
5. PWM generator
6. Buck Converter plant
7. Voltage feedback path

This matches the control architecture introduced in Project 15.

---

## Simscape Plant

Use a Buck Converter plant containing:

- DC Voltage Source
- MOSFET
- Diode
- Inductor
- Capacitor
- Load resistor
- Voltage Sensor
- Electrical Reference
- Solver Configuration

Suggested starting values:

- $V_{IN}=5V$
- $L=100\,\mu H$
- $C=100\,\mu F$
- nominal load such as $100\,\Omega$

---

## Key Features To Include

### PI Controller

Implement a PI controller in Simulink and expose:

- $K_P$
- $K_I$

for tuning sweeps.

### Duty Saturation

Clamp duty cycle to valid limits, such as:

$$
0 \le D \le 1
$$

or to the scaled PWM limits used in the lab.

### Load Disturbance

Change load resistance during the run to study disturbance rejection.

---

## Measurements To Capture

Record:

- output voltage
- error signal
- duty cycle command
- inductor current
- settling time
- overshoot
- regulation error after load change

Compare against:

- the simplified MATLAB model
- measured hardware waveforms from Project 15

---

## Investigation Tasks

### Task 1 - PI Gain Sweep

Try several values of $K_P$ and $K_I$.

Observe:

- rise time
- overshoot
- settling time
- steady-state error

### Task 2 - Load Step

Apply a load step and examine:

- output voltage dip
- controller recovery time
- final regulation quality

### Task 3 - Non-Ideal Effects

Add realistic losses and parasitics:

- MOSFET on-state resistance
- diode forward drop
- capacitor ESR
- inductor series resistance

Use the result to explain differences between ideal regulation and measured hardware behaviour.

---

## Reflection Questions

1. How does the closed-loop Simscape model compare with the simpler control-only Simulink model?
2. Which non-ideal component has the strongest effect on regulation quality?
3. Does the simulated disturbance rejection resemble the hardware lab?
4. When does controller tuning based on a simplified model stop being accurate enough?

---

## Suggested Extension

After this page, the next high-value simulation companions are:

- 10A_Motor_Simulink_Simscape.md
- 17_Grid_Following_VSC.md
- 18_Grid_Forming_VSC.md

Those projects extend the same modelling ideas into motors, current control and grid converters.

---

## Summary

This companion page lets you:

- tune a closed-loop Buck Converter safely in simulation
- compare simplified and physical models
- test disturbance rejection before hardware
- connect power-electronics behaviour with control-design decisions
