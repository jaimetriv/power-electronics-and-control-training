# Project 11 - System Identification and Dynamic Modelling

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_DC_Chopper_Converters.md
- 06_Buck_Converter.md
- 07_Boost_Converter.md
- 08_PWM_Motor_Control.md
- 09_AC_DC_Rectifiers.md
- 10_DC_AC_Inverters.md

---

## Objective

In this project you will learn:

- What system identification is
- Why mathematical models are useful
- How engineers model real systems
- First-order system behaviour
- Second-order system behaviour
- Time constants
- Step response analysis
- Experimental parameter estimation

System identification provides the bridge between real hardware and control system design.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain system identification

✅ Measure a step response

✅ Estimate a time constant

✅ Identify first-order behaviour

✅ Identify second-order behaviour

✅ Create simple mathematical models

✅ Validate a model using measurements

---

## Introduction

Control engineers rarely design controllers directly from hardware.

Instead they first create a mathematical model of the system.

The process of obtaining a model from measurements is called:

```text
System Identification
```

---

## Why Do We Need Models?

Models allow engineers to:

- Predict behaviour
- Design controllers
- Simulate systems
- Improve performance
- Reduce development time

---

## Input and Output

A system receives an input and produces an output.

Example:

```text
PWM Duty Cycle → Motor → Motor Speed
```

System identification attempts to determine how the system behaves from input-output measurements.

---

## What Is a Step Input?

A step input changes suddenly:

```text
0 V → 5 V
```

or:

```text
0% → 100% PWM
```

Step responses are easy to generate and contain valuable information about system dynamics.

---

## First-Order Transfer Function

$$
G(s) = \frac{K}{\tau s + 1}
$$

Where:

- $K$ = System Gain
- $\tau$ = Time Constant

---

## Time Constant Rule

At $t = \tau$ the output reaches approximately:

$$
63.2\%
$$

of its final value.

---

## Typical First-Order Response

```text
Output

100% |                 ______
      |              /
      |           /
      |        /
63.2% |-----*
      |   /
      | /
  0%  +--------------------
            Time
```

---

## Second-Order Transfer Function

$$
G(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}
$$

Where:

- $\omega_n$ = Natural Frequency
- $\zeta$ = Damping Ratio

---

## Step Response Characteristics

### Rise Time

Time required to reach the target.

### Overshoot

Amount exceeding the target value.

### Settling Time

Time required to stabilise.

### Steady-State Error

Final difference between reference and output.

---

## Simulink Simulation

Before measuring, simulate first-order and second-order step responses in Simulink to build intuition for what you will observe.

You will build two models:

- **Model 1** — First-order step response, four time constants
- **Model 2** — Second-order step response, five damping ratios

A MATLAB curve-fit script is also provided to preview how τ is extracted from noisy data.

---

### Model 1 — First-Order Step Response

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `first_order_step.slx`.

#### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| Step | Simulink → Sources | 1 |
| Transfer Fcn | Simulink → Continuous | 4 |
| Scope | Simulink → Sinks | 1 |

#### Step 3 — Set Step block parameters

| Parameter | Value |
|-----------|-------|
| Step time | `0` s |
| Initial value | `0` |
| Final value | `1` |

#### Step 4 — Set Transfer Fcn parameters

Each Transfer Fcn represents `K / (τs + 1)` with K = 1. Set the four blocks as follows:

| Block | Numerator | Denominator | τ (s) |
|-------|-----------|-------------|-------|
| TF1 | `[1]` | `[0.2, 1]` | 0.2 |
| TF2 | `[1]` | `[0.5, 1]` | 0.5 |
| TF3 | `[1]` | `[1.0, 1]` | 1.0 |
| TF4 | `[1]` | `[2.0, 1]` | 2.0 |

#### Step 5 — Wire the model

Connect the Step output to the input of all four Transfer Fcn blocks (branch the signal).

Connect all four Transfer Fcn outputs to the Scope.

#### Step 6 — Configure the Scope

1. Double-click the Scope.
2. Click the **gear icon (Properties)**.
3. On the **Inputs** tab set **Number of input ports** to `4`.

#### Step 7 — Wiring checklist

✅ Step output branched to all four Transfer Fcn inputs

✅ All four Transfer Fcn outputs connected to Scope inputs 1–4

✅ Denominator coefficients match `[τ, 1]` for each block

#### Step 8 — Configure simulation settings

1. Open **Modeling → Model Settings**.
2. Set **Solver** to `ode45`.
3. Set **Stop time** to `8` s.

#### Step 9 — Run and observe

Click **Run**. The Scope should show four exponential rise curves.

Smaller τ → faster rise. Larger τ → slower rise.

At t = τ each curve should reach approximately 63.2% of its final value.

---

### Model 2 — Second-Order Step Response

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `second_order_step.slx`.

#### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| Step | Simulink → Sources | 1 |
| Transfer Fcn | Simulink → Continuous | 5 |
| Scope | Simulink → Sinks | 1 |

#### Step 3 — Set Step block parameters

| Parameter | Value |
|-----------|-------|
| Step time | `0` s |
| Initial value | `0` |
| Final value | `1` |

#### Step 4 — Set Transfer Fcn parameters

Each block represents `ωn² / (s² + 2ζωn·s + ωn²)` with ωn = 5 rad/s.

| Block | Numerator | Denominator | ζ |
|-------|-----------|-------------|---|
| TF1 | `[25]` | `[1, 1, 25]` | 0.1 |
| TF2 | `[25]` | `[1, 3, 25]` | 0.3 |
| TF3 | `[25]` | `[1, 7, 25]` | 0.7 |
| TF4 | `[25]` | `[1, 10, 25]` | 1.0 |
| TF5 | `[25]` | `[1, 20, 25]` | 2.0 |

> Denominator = `[1, 2*ζ*ωn, ωn²]`. For ζ=0.1: `[1, 2×0.1×5, 25]` = `[1, 1, 25]`.

#### Step 5 — Wire the model

Connect the Step output to all five Transfer Fcn inputs.

Connect all five Transfer Fcn outputs to the Scope.

#### Step 6 — Configure the Scope

Set **Number of input ports** to `5`.

#### Step 7 — Wiring checklist

✅ Step output branched to all five Transfer Fcn inputs

✅ All five Transfer Fcn outputs connected to Scope inputs 1–5

✅ Denominator coefficients match `[1, 2*ζ*5, 25]` for each block

#### Step 8 — Configure simulation settings

1. Open **Modeling → Model Settings**.
2. Set **Solver** to `ode45`.
3. Set **Stop time** to `4` s.

#### Step 9 — Run and observe

Click **Run**. The Scope should show:

- ζ = 0.1: large overshoot, oscillatory
- ζ = 0.3: moderate overshoot
- ζ = 0.7: slight overshoot, near-optimal
- ζ = 1.0: critically damped, no overshoot
- ζ = 2.0: overdamped, slow rise

---

### Curve Fitting Preview — How to Extract τ from Data

This step uses a MATLAB script (not Simulink) because it requires `fminsearch` for numerical optimisation.

```matlab
% Simulate "measured" data with noise
tau_true = 1.0; K_true = 5.0;
t = 0:0.05:6;
y_measured = K_true*(1 - exp(-t/tau_true)) + 0.05*randn(size(t));

% Fit first-order model by minimising sum of squared errors
cost  = @(p) sum((p(1)*(1-exp(-t/p(2))) - y_measured).^2);
p_fit = fminsearch(cost, [4.0, 0.5]);

K_fit = p_fit(1); tau_fit = p_fit(2);
y_fit = K_fit * (1 - exp(-t / tau_fit));

figure; hold on;
scatter(t, y_measured, 30, 'b', 'DisplayName', 'Measured (with noise)');
plot(t, y_fit, 'r', 'LineWidth', 2, 'DisplayName', ...
    sprintf('Fit: K=%.2f, \\tau=%.2fs', K_fit, tau_fit));
grid on;
xlabel('Time (s)'); ylabel('Output');
title('First-Order Curve Fit - fminsearch');
legend('Location', 'southeast');
fprintf('True:   K=%.2f  tau=%.2fs\n', K_true, tau_true);
fprintf('Fitted: K=%.2f  tau=%.2fs\n', K_fit, tau_fit);
```

---

### Prediction Table

| System | Expected τ | Expected K | Response type |
|--------|-----------|-----------|---------------|
| RC (10 kΩ, 100 µF) | | | |
| RC (10 kΩ, 220 µF) | | | |
| RC (22 kΩ, 100 µF) | | | |
| Motor (from Project 08) | | | |

---

## Components Required

- ESP32 DevKit V1
- Breadboard and jumper wires
- 10 kΩ resistor
- 22 kΩ resistor
- 100 µF capacitor
- 220 µF capacitor
- DC motor + IRLZ44N MOSFET + flyback diode (from Project 10)
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Experiment 1 - Identify an RC Circuit

### Objective

Apply a step input to an RC circuit and measure the time constant from the oscilloscope.

---

### Circuit Diagram

```text
ESP32 GPIO18
    │
   10 kΩ resistor
    │
    ├──── Vc ──── CH1 probe tip
    │
   100 µF capacitor  (positive leg up)
    │
   GND ──── CH1 probe ground
```

---

### Step-by-Step Wiring

1. Insert the **10 kΩ resistor** across the breadboard so each leg is in a different row.
2. Connect a jumper wire from **ESP32 GPIO18** to one leg of the resistor.
3. Insert the **100 µF capacitor** so its **positive leg** is in the same row as the other resistor leg. This junction is $V_C$.
4. Connect a jumper wire from the **capacitor negative leg** to any **GND** pin on the ESP32.
5. Hook the **CH1 probe tip** to the $V_C$ junction.
6. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

---

### Wiring Checklist

Before uploading:

✅ Resistor leg in same row as GPIO18 jumper

✅ Capacitor positive leg in same row as other resistor leg

✅ Capacitor negative leg connected to GND

✅ CH1 probe tip at Vc junction

✅ CH1 probe ground at ESP32 GND

---

### ESP32 Code

```cpp
void setup()
{
    pinMode(18, OUTPUT);
    digitalWrite(18, LOW);
    delay(2000);
    digitalWrite(18, HIGH);
}

void loop() {}
```

> **Arduino Uno:** replace GPIO18 with pin 9 and use `pinMode(9, OUTPUT)` / `digitalWrite(9, HIGH)`.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 1 V/div | 1 V/div |
| Horizontal scale | 500 ms/div | 500 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Measurement Procedure

1. Apply the step input.
2. Observe the capacitor charging curve.
3. Record the final voltage.
4. Calculate 63.2% of the final value.
5. Measure the time required to reach that point — this is your measured τ.

---

### Results Table

| Parameter | Value |
|-----------|-------|
| Final Voltage | |
| 63.2% Voltage | |
| Measured Time Constant | |
| Calculated Time Constant (RC) | |

---

## Experiment 2 - Vary Component Values

### Objective

Observe how component values affect the time constant.

---

### Test A

```text
R = 10 kΩ,  C = 100 µF  →  τ = 1.0 s
```

---

### Test B

```text
R = 10 kΩ,  C = 220 µF  →  τ = 2.2 s
```

---

### Test C

```text
R = 22 kΩ,  C = 100 µF  →  τ = 2.2 s
```

For each test, adjust the oscilloscope horizontal scale to suit the new time constant.

---

### Results Table

| Resistance | Capacitance | Theoretical τ | Measured τ |
|------------|-------------|--------------|-----------|
| 10 kΩ | 100 µF | 1.0 s | |
| 10 kΩ | 220 µF | 2.2 s | |
| 22 kΩ | 100 µF | 2.2 s | |

---

## Experiment 3 - Identify Motor Dynamics

### Objective

Apply a PWM step change to the motor and observe the first-order speed response.

---

### Circuit

Same as Project 10 (MOSFET motor driver with flyback diode).

---

### Procedure

1. Upload the step code from Project 10 Experiment 4.
2. Observe the motor speed response visually.
3. Record the approximate rise time and settling time.
4. Estimate τ as the time to reach 63.2% of final speed.

---

### Record

| Parameter | Value |
|-----------|-------|
| Approximate rise time | |
| Approximate settling time | |
| Estimated τ | |

---

## MATLAB Comparison

Fit first-order models to your measured RC and motor step responses and validate them.

### RC Circuit Model Fit

```matlab
% Enter your measured RC step response
% t_data: time vector (s), y_data: capacitor voltage (V)
t_data = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0]; % replace
y_data = [0, 0.9, 1.6, 2.2, 2.7, 3.1, 3.7, 4.1, 4.6, 4.8, 5.0]; % replace (V)

Vfinal = max(y_data);

cost   = @(p) sum((p(1)*(1-exp(-t_data/p(2))) - y_data).^2);
p_fit  = fminsearch(cost, [Vfinal, 0.5]);
K_fit  = p_fit(1);
tau_fit = p_fit(2);

t_model = 0:0.01:max(t_data);
y_model = K_fit * (1 - exp(-t_model / tau_fit));

figure; hold on;
scatter(t_data, y_data, 50, 'b', 'filled', 'DisplayName', 'Measured');
plot(t_model, y_model, 'r', 'LineWidth', 2, 'DisplayName', ...
    sprintf('Fit: K=%.2fV, \\tau=%.3fs', K_fit, tau_fit));
xline(tau_fit, 'k--', sprintf('\\tau=%.3fs', tau_fit));
yline(0.632*K_fit, 'k:', '63.2%');
grid on;
xlabel('Time (s)'); ylabel('Capacitor Voltage (V)');
title('RC Circuit - First-Order Model Fit');
legend('Location', 'southeast');

tau_theory = 10000 * 100e-6;
fprintf('Theoretical \\tau: %.3f s\n', tau_theory);
fprintf('Fitted      \\tau: %.3f s\n', tau_fit);
fprintf('Error:            %.1f%%\n', 100*abs(tau_fit-tau_theory)/tau_theory);
```

### Reflection

- How close is your fitted RC τ to the theoretical value RC = 1.0 s? What causes the difference?
- Does the motor step response fit well to a first-order model, or do you see a delay or second-order behaviour?
- How does the motor τ identified here compare to your informal estimate from Project 10?

---

## Troubleshooting

### Incorrect Time Constant

Check:

✅ Component values (read resistor colour bands or measure with multimeter)

✅ Oscilloscope horizontal scale appropriate for the time constant

✅ Trigger location at the start of the step

---

### Poor Measurements

Check:

✅ CH1 probe ground connected to ESP32 GND

✅ Trigger settings stable

✅ Timebase set to show the full charging curve

---

### Troubleshooting Checklist

✅ Step input applied correctly

✅ Output waveform captured

✅ Final value measured

✅ 63.2% point calculated

✅ Time constant measured

✅ Model compared with measurements

---

## Knowledge Check

### Question 1

What is system identification?

---

### Question 2

What is a time constant?

---

### Question 3

What percentage of the final value is reached after one time constant?

---

### Question 4

What is a step input?

---

### Question 5

Why is model validation important?

---

### Question 6

Your curve fit gives τ = 1.12 s for the RC circuit but the theoretical value is 1.0 s. Name two physical reasons that could explain this, and explain how you would use the fitted model (rather than the theoretical one) in controller design.

---

## Project Summary

In this project you learned:

✅ System identification

✅ Dynamic system modelling

✅ First-order systems

✅ Second-order systems

✅ Time constants

✅ Step response analysis

✅ Model validation

✅ Experimental parameter estimation

---

## Next Project

```text
12_P_Controller.md
```

Topics:

- Feedback Control
- Error Signals
- Open Loop vs Closed Loop
- Proportional Controller Gain
- Stability
- Performance Tuning
