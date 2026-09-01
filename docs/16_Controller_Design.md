# Project 16 - Controller Design and Practical Control Engineering

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 08_PWM_Motor_Control.md
- 12_P_Controller.md
- 13_PI_Controller.md
- 14_PID_Controller.md
- 06_Buck_Converter.md
- 15_Closed_Loop_Buck.md
- 07_Boost_Converter.md
- 05_DC_Chopper_Converters.md
- 09_AC_DC_Rectifiers.md
- 10_DC_AC_Inverters.md
- 11_System_Identification.md

---

## Objective

In this project you will learn:

- The controller design process
- How mathematical models are used
- Performance specifications
- Stability concepts
- Controller tuning methods
- Model-based control design
- Practical implementation considerations

This project brings together everything learned throughout the course.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Follow a structured controller design process

✅ Define performance requirements

✅ Design a P controller

✅ Design a PI controller

✅ Design a PID controller

✅ Evaluate controller performance

✅ Understand design trade-offs

✅ Apply control engineering principles to real systems

---

## Introduction

Control engineering is the process of designing systems that automatically achieve desired performance.

Examples include:

- Motor speed control
- Temperature regulation
- Voltage regulation
- Position control
- Process control

---

## Review of the Control Loop

```text
Reference → [−] → Controller → Plant → Output
               ↑                          │
               └──────── Feedback ────────┘
```

The controller continually adjusts the plant input to reduce error.

---

## Controller Design Process

```text
Define Requirements
       ↓
Model System
       ↓
Design Controller
       ↓
Simulate
       ↓
Implement
       ↓
Test and Refine
```

---

## Step 1 - Define Requirements

Before designing a controller, performance requirements must be specified.

Typical requirements include:

- Response speed
- Accuracy
- Stability
- Overshoot limits
- Disturbance rejection

### Example Requirements

```text
Target Speed = 1000 RPM

Overshoot < 10%

Settling Time < 2 s

Steady-State Error = 0
```

---

## Step 2 - Obtain a Model

From Project 11 (System Identification), experimental measurements provide mathematical models.

### Example First-Order Model

$$
G(s) = \frac{K}{\tau s + 1}
$$

Models allow engineers to predict performance, tune gains, evaluate stability, and simulate behaviour without risking hardware damage.

---

## Step 3 - Select a Controller

| Controller | Characteristics |
|------------|----------------|
| P | Simple, fast, has steady-state error |
| PI | Eliminates steady-state error |
| PID | Improved overall performance |

---

## Step 4 - Evaluate Performance

### Rise Time

The time required for the output to approach its target value.

### Overshoot

The amount by which the output exceeds the desired value.

### Settling Time

The time required to remain within an acceptable error band.

### Steady-State Error

The final difference between reference and output.

---

## Typical Response

```text
Output

120% |       /\
      |      /  \
100% |-----/----\-------
      |   /
      |  /
  0%  +------------------
             Time
```

---

## Stability

A stable control system eventually settles to a predictable value.

### Stable Response

```text
Output

100% |-----------
      |
      |
  0%  +----------------
            Time
```

### Unstable Response

```text
Output

      /\
     /  \     /\
    /    \   /  \
---/------\-/----\----
```

Oscillations continue growing or never settle.

---

## Controller Tuning

### Effect of Increasing Kp

✅ Speeds up response

❌ May increase overshoot

❌ May reduce stability margin

### Effect of Increasing Ki

✅ Reduces steady-state error

❌ Increases oscillation risk

### Effect of Increasing Kd

✅ Improves damping

✅ Reduces overshoot

❌ Can increase sensitivity to noise

---

## Practical Tuning Procedure

### Step 1

Set Ki = 0 and Kd = 0.

Increase Kp until the response becomes sufficiently fast.

### Step 2

Increase Ki to eliminate steady-state error.

### Step 3

Increase Kd if overshoot or oscillation is excessive.

---

## Design Trade-Offs

| Improve | Possible Consequence |
|---------|---------------------|
| Faster Response | More Overshoot |
| Lower Error | More Oscillation |
| Higher Stability | Slower Response |
| Higher Gain | Reduced Robustness |

---

## Simulink Simulation

Before building, use the motor model identified in Project 11 to predict how P, PI, and PID controllers will perform.

This is a signal-only model — no Simscape electrical components are needed.

---

### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `controller_design.slx`.

---

### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| Step | Simulink → Sources | 1 |
| Sum | Simulink → Math Operations | 3 |
| Gain | Simulink → Math Operations | 3 |
| Integrator | Simulink → Continuous | 1 |
| Derivative | Simulink → Continuous | 1 |
| Transfer Fcn | Simulink → Continuous | 3 |
| Scope | Simulink → Sinks | 1 |

---

### Step 3 — Set block parameters

Step block:

| Parameter | Value |
|-----------|-------|
| Step time | `0` s |
| Initial value | `0` |
| Final value | `1` |

All three Transfer Fcn blocks (motor plant `K/(τs+1)`):

| Parameter | Value |
|-----------|-------|
| Numerator | `[1]` |
| Denominator | `[0.5, 1]` |

> Replace `0.5` with your measured τ from Project 11.

Gain blocks:

| Block | Gain | Purpose |
|-------|------|---------|
| Kp | `3` | Proportional |
| Ki | `4` | Integral |
| Kd | `0.05` | Derivative |

All three Sum blocks (error junctions): signs `+-`

---

### Step 4 — Build three parallel closed loops

Build one closed loop per controller type, each fed from the same Step block:

**P loop:**

```text
Step → SumP (+−) → Kp Gain → Plant P → Scope input 1
Plant P output → SumP (−) input
```

**PI loop:**

```text
Step → SumPI (+−) → [Kp Gain + Ki Gain → Integrator] → Sum(++) → Plant PI → Scope input 2
Plant PI output → SumPI (−) input
```

**PID loop:**

```text
Step → SumPID (+−) → [Kp + Ki→Integrator + Kd→Derivative] → Sum(+++) → Plant PID → Scope input 3
Plant PID output → SumPID (−) input
```

> Each loop has its own Sum (error junction), its own plant Transfer Fcn, and its own feedback wire. The Step output is branched to all three error junctions.

---

### Step 5 — Configure the Scope

1. Double-click the Scope.
2. Click the **gear icon (Properties)**.
3. On the **Inputs** tab set **Number of input ports** to `3`.
4. On the **Display** tab set **Layout** to `3×1`.

---

### Step 6 — Wiring checklist

✅ Step output branched to all three error Sum blocks

✅ Each loop has its own Transfer Fcn with denominator `[0.5, 1]`

✅ Each Transfer Fcn output fed back to its own error Sum (−) input

✅ P loop: Kp Gain only between error Sum and plant

✅ PI loop: Kp + Ki→Integrator combined in a `++` Sum before plant

✅ PID loop: Kp + Ki→Integrator + Kd→Derivative combined in a `+++` Sum before plant

✅ All three plant outputs connected to Scope inputs 1–3

---

### Step 7 — Configure simulation settings

1. Open **Modeling → Model Settings**.
2. Set **Solver** to `ode45`.
3. Set **Stop time** to `3` s.

---

### Step 8 — Run and observe

Click **Run**. The three-panel Scope should show:

- Panel 1 (P): fast response, steady-state error present
- Panel 2 (PI): error eliminated, possible overshoot
- Panel 3 (PID): reduced overshoot compared to PI, good settling

Record the predicted rise time, overshoot, and settling time for each controller before proceeding to the experiments.

---

## Experiment 1 - Manual Controller Tuning

### Objective

Observe how gain values affect behaviour using the motor circuit from Projects 12–14.

---

### Circuit

Same as Projects 12–14 (MOSFET motor driver with back-EMF feedback and potentiometer setpoint).

---

### Procedure

Use the PID code from Project 14.

Step through the following gain sets, recording the behaviour at each:

---

### Test A — P Only

```cpp
Kp = 1.0;
Ki = 0.0;
Kd = 0.0;
```

Record: rise time, overshoot, stability.

---

### Test B — Increased Kp

```cpp
Kp = 5.0;
Ki = 0.0;
Kd = 0.0;
```

Record: rise time, overshoot, stability.

---

### Test C — Add Integral Action

```cpp
Kp = 5.0;
Ki = 0.5;
Kd = 0.0;
```

Observe: steady-state error, oscillation.

---

### Test D — Add Derivative Action

```cpp
Kp = 5.0;
Ki = 0.5;
Kd = 0.1;
```

Observe: settling time, damping, overshoot.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Kp</th><th>Ki</th><th>Kd</th><th>Behaviour</th></tr></thead>
  <tbody>
    <tr><td>1.0</td><td>0.0</td><td>0.0</td><td><input class="result-input" id="lab16-exp1-beh1" placeholder=""></td></tr>
    <tr><td>5.0</td><td>0.0</td><td>0.0</td><td><input class="result-input" id="lab16-exp1-beh2" placeholder=""></td></tr>
    <tr><td>5.0</td><td>0.5</td><td>0.0</td><td><input class="result-input" id="lab16-exp1-beh3" placeholder=""></td></tr>
    <tr><td>5.0</td><td>0.5</td><td>0.1</td><td><input class="result-input" id="lab16-exp1-beh4" placeholder=""></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 2 - Disturbance Rejection

### Objective

Observe controller response to disturbances.

---

### Procedure

Operate the system normally with the PID controller running.

Introduce a disturbance such as:

- Gently loading the motor shaft with your finger
- Changing the potentiometer setpoint suddenly

Observe the response.

---

### Questions

Does the controller:

- Recover quickly?
- Overshoot?
- Oscillate?
- Eliminate error?

<div class="result-block">
  <textarea class="result-textarea" id="lab16-exp2-obs" placeholder="Record your disturbance rejection observations..."></textarea>
</div>

---

## MATLAB Comparison

Enter your identified motor model and the gains you settled on during the experiments. Overlay the simulated step response against your measured Serial data.

```matlab
% Enter your identified values from Project 11
K   = 1.0;    % replace with your fitted K
tau = 0.5;    % replace with your fitted tau (s)

% Enter gains that worked best in Experiment 1
Kp = 3;  Ki = 4;  Kd = 0.05;

% Enter measured step response (time in s, output 0–1 normalised)
t_meas = [0, 0.1, 0.2, 0.3, 0.5, 0.8, 1.0, 1.5, 2.0];  % replace
y_meas = [0, 0.2, 0.5, 0.8, 1.05, 1.02, 1.0, 1.0, 1.0]; % replace

s = tf('s');
G    = K / (tau*s + 1);
Cpid = Kp + Ki/s + Kd*s;
T    = feedback(Cpid*G, 1);

t = 0:0.01:3;
[y_sim, ~] = step(T, t);

figure;
plot(t, y_sim, 'b-', 'LineWidth', 1.5); hold on;
plot(t_meas, y_meas, 'ro--', 'MarkerSize', 6);
yline(1, 'k--');
legend('Simulated PID','Measured'); grid on;
xlabel('Time (s)'); ylabel('Normalised Output');
title(sprintf('PID Controller: Simulated vs Measured  Kp=%.1f Ki=%.1f Kd=%.2f', Kp, Ki, Kd));

si = stepinfo(T);
fprintf('Simulated rise time:    %.3f s\n', si.RiseTime);
fprintf('Simulated overshoot:    %.1f %%\n', si.Overshoot);
fprintf('Simulated settling time:%.3f s\n', si.SettlingTime);
```

### Reflection

1. Does the simulated overshoot match the measured overshoot? If not, what physical effects are missing from the model?
2. Did the gains designed from the model work well on the hardware, or did you need to retune? Why?
3. How would a second-order motor model (with inductance) change the predicted response?

---

## Troubleshooting

### Gains Too Large

Symptoms: oscillation, instability, saturation.

Reduce Kp and Ki.

---

### Gains Too Small

Symptoms: slow response, large error.

Increase Kp carefully.

---

### Ignoring Actuator Limits

Can result in saturation, windup, and poor performance.

Ensure `constrain()` and anti-windup are in the code.

---

### Troubleshooting Checklist

✅ Model identified correctly

✅ Controller selected appropriately

✅ Gains adjusted systematically

✅ Output remains stable

✅ Disturbances rejected

✅ Saturation handled

✅ Desired performance achieved

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab16">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab16">✕ Clear All Results</button>
</div>

---

## Knowledge Check

### Question 1

Why is a mathematical model useful?

---

### Question 2

What does integral action do?

---

### Question 3

What does derivative action do?

---

### Question 4

What is integral windup?

---

### Question 5

What is the purpose of controller tuning?

---

### Question 6

Your MATLAB simulation predicted zero steady-state error and 8% overshoot with a PI controller, but the physical motor showed 20% overshoot and a small residual error. List two physical effects that could explain each discrepancy, and describe how you would update the model to reduce the gap.

---

## Next Project

```text
17_Grid_Following_VSC.md
```

Topics:

- Voltage Source Converters
- Grid Synchronisation
- Phase-Locked Loops
- Current Control
- Active and Reactive Power
- Grid-Following Operation

---

## Final Course Summary

Throughout this course you have studied:

✅ PWM

✅ RC Circuits

✅ RLC Circuits

✅ MOSFETs

✅ Motor Control

✅ P Control

✅ PI Control

✅ PID Control

✅ Buck Converters

✅ Boost Converters

✅ DC Choppers

✅ Rectifiers

✅ Inverters

✅ System Identification

✅ Controller Design

You now have a foundation in:

```text
Electronics

Power Electronics

Control Engineering

Embedded Systems
```

and the practical skills required to continue into more advanced topics such as:

- State-Space Control
- Digital Control Systems
- Motor Drive Design
- Power Supply Design
- Advanced Robotics
- Industrial Automation
