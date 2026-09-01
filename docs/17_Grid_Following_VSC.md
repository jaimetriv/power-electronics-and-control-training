# Project 17 - Grid-Following Voltage Source Converter (VSC)

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
- 16_Controller_Design.md

---

## Objective

In this project you will learn:

- What a Grid-Following Converter is
- Why synchronisation is required
- How a Phase Locked Loop (PLL) works
- How current is injected into an AC system
- How SPWM controls an inverter
- How current control loops work
- How dq control simplifies AC control
- How modern solar and battery inverters operate

This is the capstone project for the course.

---

## Safety Notice

```text
MUST NOT be connected directly to mains power.
```

All experiments must use low-voltage AC sources such as:

- Function generators
- Isolated AC laboratory supplies

Recommended AC test voltage:

```text
1 V to 10 V RMS
```

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain Grid-Following Operation

✅ Explain PLL Synchronisation

✅ Explain Current Injection

✅ Design a Current Controller

✅ Implement PI Regulation

✅ Generate SPWM

✅ Understand dq Control

✅ Understand Modern Renewable Energy Converters

---

## Introduction

Most modern renewable energy systems use Grid-Following converters.

Examples:

- Solar Inverters
- Battery Energy Storage Systems
- EV Chargers
- Grid-Tied Converters

---

## What Is a Grid-Following Converter?

A Grid-Following Converter does not create the grid voltage.

Instead:

```text
The Grid Creates Voltage

The Converter Injects Current
```

The grid already establishes voltage magnitude, frequency, and phase angle.

The inverter therefore controls current rather than voltage.

---

## Power Transfer

Real power is:

$$
P = VI\cos(\phi)
$$

If voltage and current are in phase ($\phi = 0$):

$$
P = VI
$$

Maximum real power is transferred.

---

## Overall Control Structure

```text
Grid Voltage
      ↓
     PLL
      ↓
Grid Angle θ
      ↓
Current Controller
      ↓
    SPWM
      ↓
  Inverter
      ↓
   Filter
      ↓
    Grid
```

---

## Hardware Overview

The laboratory setup consists of:

```text
AC Source (function generator)
      +
Measurement System (voltage divider + current sensor)
      +
Controller (ESP32 DevKit V1)
      +
Inverter (H-Bridge MOSFETs + gate driver)
      +
Filter (L filter inductor)
```

---

## Recommended Hardware

### Controller

- ESP32 DevKit V1 (recommended)
- STM32 Nucleo (alternative)
- Arduino Mega (alternative)

### Oscilloscope

- OWON HDS272S (recommended)
- DSO Nano (compatible)

### Signal Generator (simulated grid)

- FY6900, JDS6600, or any function generator

### Current Sensor

- ACS712 or ACS758

### Voltage Measurement

- Resistor divider

### Inverter Stage

- MOSFET H-Bridge (4 × IRLZ44N)
- IR2104 or IR2110 gate driver

### Filter

- L filter: 1 mH to 5 mH inductor

---

## System Schematic

```text
Function Generator (simulated grid)
        │
        ▼
  Grid Voltage
        │
   ┌────┴────┐
   ▼         ▼
  PLL    Voltage Sensor
   │
   ▼
Current Controller
   │
   ▼
SPWM Generator
   │
   ▼
H-Bridge Inverter
   │
   ▼
L Filter
   │
   ▼
Current Sensor
   │
   ▼
Simulated Grid
```

---

## Concept of Synchronisation

Before current can be injected, the grid position must be known.

Grid voltage:

$$
v(t) = V_m \sin(\omega t)
$$

The controller must determine frequency, phase, and zero crossings.

---

## Phase Locked Loop (PLL)

A PLL estimates the grid angle:

$$
\theta = \omega t
$$

### Simplified PLL Block Diagram

```text
Grid Voltage → Phase Detector → PI Controller → Frequency Estimate → Integrator → Grid Angle θ
```

The PLL itself contains a PI controller.

Without synchronisation, current injection will occur at the wrong phase angle, resulting in poor power transfer, instability, or excessive current.

---

## Why Use dq Control?

AC currents are sinusoidal and difficult to regulate directly.

The dq transform converts sinusoidal signals into approximately DC signals.

Example:

$$
i(t) = 10\sin(\omega t)
$$

becomes approximately:

```text
Id = 10

Iq = 0
```

which is easier to regulate with a PI controller.

---

## Current PI Controller

The current controller calculates:

$$
e = I_d^* - I_d
$$

and produces:

$$
u = K_P e + K_I \int e\,dt
$$

---

## Simulink Simulation

Before building, simulate three key subsystems in Simulink: PLL angle tracking, SPWM generation, and the PI current controller on the L-filter plant.

All three are signal-only models — no Simscape electrical components are needed.

---

### Model 1 — PLL Angle Tracking and SPWM

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `gfl_pll_spwm.slx`.

#### Step 2 — Add blocks

| Block | Library path | Quantity | Label |
|-------|-------------|----------|-------|
| Sine Wave | Simulink → Sources | 2 | `Grid Voltage`, `SPWM Carrier` |
| Relational Operator | Simulink → Logic and Bit Operations | 1 | `SPWM` |
| Scope | Simulink → Sinks | 1 | |

#### Step 3 — Set Sine Wave (Grid Voltage) parameters

| Parameter | Value |
|-----------|-------|
| Amplitude | `5` |
| Frequency (rad/s) | `2*pi*50` |
| Phase (rad) | `0` |

#### Step 4 — Set Sine Wave (SPWM Carrier) parameters

| Parameter | Value |
|-----------|-------|
| Amplitude | `1` |
| Frequency (rad/s) | `2*pi*10000` |
| Phase (rad) | `pi/2` |

#### Step 5 — Set Relational Operator parameters

| Parameter | Value |
|-----------|-------|
| Operator | `>` |
| Output data type | `double` |

#### Step 6 — Wire the model

```text
Grid Voltage → Scope input 1   [grid waveform]
Grid Voltage → Relational Operator input 1
SPWM Carrier → Relational Operator input 2
Relational Operator output → Scope input 2   [SPWM pattern]
```

#### Step 7 — Configure the Scope

Set **Number of input ports** to `2`, **Layout** to `2×1`.

#### Step 8 — Configure simulation settings

| Parameter | Value |
|-----------|-------|
| Solver | `ode45` |
| Stop time | `0.1` s |
| Max step size | `1e-5` |

#### Step 9 — Run and observe

- Panel 1: 50 Hz sine wave (simulated grid)
- Panel 2: SPWM pattern with varying pulse widths — narrow at zero crossings, wide at peaks

---

### Model 2 — PI Current Controller

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `gfl_current_control.slx`.

#### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| Step | Simulink → Sources | 1 |
| Sum | Simulink → Math Operations | 2 |
| Gain | Simulink → Math Operations | 2 |
| Integrator | Simulink → Continuous | 1 |
| Transfer Fcn | Simulink → Continuous | 1 |
| Scope | Simulink → Sinks | 1 |

#### Step 3 — Set block parameters

Step block (current reference):

| Parameter | Value |
|-----------|-------|
| Step time | `0` s |
| Final value | `0.5` |

Gain block 1 (Kp): `2`

Gain block 2 (Ki): `50`

Sum block 1 (error junction): signs `+-`

Sum block 2 (PI sum): signs `++`

Transfer Fcn (L-filter plant `1/(Ls+R)`):

| Parameter | Value |
|-----------|-------|
| Numerator | `[1]` |
| Denominator | `[0.001, 1]` |

> Denominator = `[L, R]` = `[1e-3, 1]`

#### Step 4 — Wire the closed-loop

```text
Step → Sum1 (+) input
Sum1 output → Kp Gain → Sum2 (+) input 1
Sum1 output → Ki Gain → Integrator → Sum2 (+) input 2
Sum2 output → Transfer Fcn → Scope
Transfer Fcn output → Sum1 (−) input
```

#### Step 5 — Wiring checklist

✅ Step output to Sum1 (+)

✅ Sum1 output branched to Kp Gain and Ki Gain

✅ Ki Gain → Integrator → Sum2 input 2

✅ Kp Gain → Sum2 input 1

✅ Sum2 → Transfer Fcn → Scope

✅ Transfer Fcn output fed back to Sum1 (−)

#### Step 6 — Configure simulation settings

| Parameter | Value |
|-----------|-------|
| Solver | `ode45` |
| Stop time | `0.05` s |

#### Step 7 — Run and observe

The Scope should show the current rising from 0 to 0.5 A with fast settling.

Record the predicted rise time and overshoot before running Experiment 4.

---

### Prediction Table

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Predicted value</th></tr></thead>
  <tbody>
    <tr><td>Current controller rise time</td><td><input class="result-input" id="lab17-sim-rise" placeholder="s"></td></tr>
    <tr><td>Current controller overshoot (%)</td><td><input class="result-input" id="lab17-sim-os" placeholder="%"></td></tr>
    <tr><td>SPWM carrier frequency (Hz)</td><td>10 000</td></tr>
    <tr><td>Grid frequency (Hz)</td><td>50</td></tr>
  </tbody>
</table>
</div>

---

## Experiment 1 - PLL Observation

### Objective

Measure the grid phase angle and verify PLL tracking.

---

### Procedure

1. Set the function generator to output a **50 Hz sine wave** at **5 Vpeak**.
2. Connect the function generator output to the controller ADC input through a voltage divider (to scale to 0–3.3 V for ESP32).
3. Upload PLL code to the ESP32.
4. Connect the oscilloscope probe to the function generator output.
5. Observe zero crossings and verify the PLL is tracking the grid angle.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 1 V/div | 1 V/div |
| Horizontal scale | 5 ms/div | 5 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | AC | AC |

---

### Observe

The oscilloscope should show a stable 50 Hz sine wave.

The Serial Monitor should show the estimated grid angle increasing from 0 to 2π and wrapping around.

---

## Experiment 2 - SPWM Generation

### Objective

Generate a sinusoidal PWM pattern synchronised to the grid angle.

---

### Procedure

1. Upload SPWM generation code to the ESP32.
2. Connect the oscilloscope probe to the PWM output pin.
3. Set horizontal scale to **2 ms/div** to observe the varying pulse widths.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 2 ms/div | 2 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Observe

Measure:

- PWM carrier frequency
- Modulation index (duty cycle variation)
- Output period (~20 ms for 50 Hz)

---

## Experiment 3 - Inverter Output

### Objective

Measure the filtered inverter output voltage.

---

### Connections

```text
Probe Tip  ──────► Inverter output (after L filter)
Probe GND  ──────► Circuit GND
```

---

### Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>PWM Frequency</td><td><input class="result-input" id="lab17-exp3-pwmfreq" placeholder="Hz"></td></tr>
    <tr><td>Grid Frequency</td><td><input class="result-input" id="lab17-exp3-gridfreq" placeholder="Hz"></td></tr>
    <tr><td>RMS Voltage</td><td><input class="result-input" id="lab17-exp3-vrms" placeholder="V"></td></tr>
    <tr><td>Peak Voltage</td><td><input class="result-input" id="lab17-exp3-vpeak" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 4 - Current Control

### Objective

Regulate the injected current to a series of reference values and verify tracking.

---

### Setpoint Tests

Test the following current references:

```text
0.5 A

1.0 A

1.5 A
```

For each setpoint, record the measured current from the ACS712 sensor.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Current Reference</th><th>Measured Current</th></tr></thead>
  <tbody>
    <tr><td>0.5 A</td><td><input class="result-input" id="lab17-exp4-i05" placeholder="A"></td></tr>
    <tr><td>1.0 A</td><td><input class="result-input" id="lab17-exp4-i10" placeholder="A"></td></tr>
    <tr><td>1.5 A</td><td><input class="result-input" id="lab17-exp4-i15" placeholder="A"></td></tr>
  </tbody>
</table>
</div>

---

## MATLAB Comparison

After completing the experiments, enter your measured current tracking data and compare against the simulated PI response.

```matlab
% Enter your system parameters
L      = 1e-3;    % your filter inductance (H)
R      = 1;       % estimated winding resistance (Ohm)
Kp_cc  = 2;       % gains used in Experiment 4
Ki_cc  = 50;
I_ref  = 0.5;     % A
f_grid = 50;      % Hz

% Enter measured current step response (time in s, current in A)
t_meas = [0, 0.002, 0.005, 0.010, 0.015, 0.020, 0.030, 0.040, 0.050]; % replace
i_meas = [0, 0.15,  0.38,  0.52,  0.50,  0.50,  0.50,  0.50,  0.50];  % replace

% Enter measured grid frequency from oscilloscope
f_meas = 50.2;    % Hz — replace with your reading

s   = tf('s');
G_L = 1 / (L*s + R);
C   = Kp_cc + Ki_cc/s;
T   = feedback(C*G_L, 1);
[y_sim, t_sim] = step(I_ref * T, 0:1e-5:0.05);

figure;
subplot(2,1,1);
plot(t_sim, y_sim, 'b-', 'LineWidth', 1.5); hold on;
plot(t_meas, i_meas, 'ro--', 'MarkerSize', 6);
yline(I_ref, 'k--');
legend('Simulated','Measured'); grid on;
xlabel('Time (s)'); ylabel('Current (A)');
title(sprintf('PI Current Controller: Simulated vs Measured  Kp=%.1f Ki=%.0f', Kp_cc, Ki_cc));

subplot(2,1,2);
bar([f_grid, f_meas]);
set(gca,'XTickLabel',{'Setpoint','Measured'});
ylabel('Frequency (Hz)'); grid on;
title(sprintf('Grid Frequency Error: %.2f Hz  (%.3f %%)', ...
    abs(f_meas-f_grid), abs(f_meas-f_grid)/f_grid*100));

si = stepinfo(T);
fprintf('Simulated rise time:    %.4f s\n', si.RiseTime);
fprintf('Simulated overshoot:    %.1f %%\n', si.Overshoot);
fprintf('Simulated settling time:%.4f s\n', si.SettlingTime);
fprintf('Grid frequency error:   %.3f %%\n', abs(f_meas-f_grid)/f_grid*100);
```

### Reflection

1. Does the simulated current rise time match the measured result? What physical effects (e.g. MOSFET dead-time, sensor delay) could explain any difference?
2. How does the grid frequency error affect the PLL angle estimate over time?
3. What would happen to current injection if the PLL lost lock mid-cycle?

---

## Troubleshooting

### PLL Not Locking

Check:

✅ Signal generator connected and outputting 50 Hz sine wave

✅ Voltage divider scaling signal to ADC range

✅ PLL PI gains appropriate

---

### Excessive Current Ripple

Check:

✅ Filter inductance value

✅ PWM carrier frequency (higher frequency → less ripple)

---

### Unstable Current Control

Check:

✅ Current controller gains (reduce Kp_cc)

✅ Current sensor calibration and offset

---

### Troubleshooting Checklist

✅ Grid signal available from function generator

✅ PLL locked (angle tracking visible in Serial Monitor)

✅ SPWM operating (varying pulse widths visible on oscilloscope)

✅ H-Bridge switching correctly

✅ L filter installed

✅ Current sensor operating

✅ Current tracking reference

✅ Stable system operation

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab17">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab17">✕ Clear All Results</button>
</div>

---

## Knowledge Check

### Question 1

What does a grid-following converter control?

---

### Question 2

Why is a PLL required?

---

### Question 3

Why is current control used instead of voltage control?

---

### Question 4

What is the purpose of the output filter?

---

### Question 5

Why is dq control useful?

---

### Question 6

During Experiment 4 your measured current settling time was longer than the MATLAB simulation predicted. List two physical causes and explain how you would update the plant model $G(s) = 1/(Ls + R)$ to account for them.

---

---

## Next Project

```text
18_Grid_Forming_VSC.md
```

Topics:

- Grid-Forming Operation
- Autonomous AC Generation
- Voltage Regulation
- Droop Control
- Virtual Synchronous Machines
- Microgrid Fundamentals

---

## Project Summary

This project combines:

✅ PWM

✅ MOSFET Switching

✅ Inverters

✅ PI Controllers

✅ Signal Processing

✅ Control Systems

✅ System Identification

✅ Power Electronics

✅ AC Systems

✅ Renewable Energy Concepts

into a complete modern converter control architecture.

You have now progressed from basic PWM generation to the same fundamental control structure used in modern:

- Solar Inverters
- Battery Energy Storage Systems
- EV Chargers
- Utility-Scale Converters
- Grid Support Systems

and have completed the full introductory power electronics and control engineering pathway.
