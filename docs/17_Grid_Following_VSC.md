# Project 17 - Grid-Following Voltage Source Converter (VSC)

---

## Reading Before the Lab

Read _Fundamentals of Electric Circuits_ by Alexander and Sadiku, Chapter 12 for three-phase circuits and balanced voltage/current relationships. Then read _Voltage-Sourced Converters in Power Systems_ by Yazdani and Iravani, Chapters 2–4, for VSC operation, PWM, balanced three-phase operation, PLL, dq transformation, and grid-connected current control. Predict why synchronization is required and how dq current commands affect AC power.

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

!!! danger "No grid connection"
  Never connect this project to mains or connect the H-bridge output to the function generator. The generator supplies only a low-voltage PLL reference signal; the inverter drives only the separate 100 Ω load from the Lab 10 5 V / 100 mA current-limited stage. Grid current injection and current-loop tests remain simulation-only.

For the physical PLL input, set a 50 Hz sine to no more than 1.0 V peak as measured on the scope before connecting the ESP32 interface. Use the biased, protected ADC interface below; never connect a bipolar generator output directly to an ESP32 ADC pin.

The repository does not include or validate ESP32 PLL firmware. The physical input exercise below verifies only the protected signal interface and ADC voltage range; phase tracking remains a Simulink exercise until validated firmware is supplied. The Lab 10 inverter demonstration uses its own fixed 50 Hz reference and is not synchronized to this input.

The physical scope of this project is the protected PLL input interface plus a separate Lab 10 load demonstration. The PLL and grid-current control algorithms remain simulation exercises.

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
P = V_{RMS}I_{RMS}\cos(\phi)
$$

If voltage and current are in phase ($\phi = 0$):

$$
P = V_{RMS}I_{RMS}
$$

For a given RMS voltage and current magnitude, unity power factor gives the largest real-power component. The actual transferred power is still limited by converter current, thermal ratings, grid impedance, and the available DC-link power.

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

The physical exercises use two separate low-voltage circuits:

```text
Function generator (≤1 V peak, 50 Hz) → protected biased ADC input at GPIO34
Lab 10 fixed-reference SPWM → DRV8833 H-bridge (5 V, 100 mA limit) → LC filter → 100 Ω load
```

These are separate demonstrations, not a PLL-to-inverter control loop. The two circuits share signal ground only. Do not wire the load or H-bridge output to the function generator. Grid current injection is simulation-only.

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

- OWON HDS272S built-in generator or another isolated low-voltage source, adjusted and scope-verified to no more than 1.0 V peak at 50 Hz

### Current Sensor

- Current control and the 0.5-1.5 A grid-injection examples are simulation-only; an ACS712 5 A module is not suitable for accurate current measurement on the Lab 10 low-current load

### Voltage Measurement

- PLL input interface: function-generator output through a 1 µF series capacitor and 10 kΩ resistor to GPIO34; 100 kΩ from GPIO34 to 3.3 V and 100 kΩ from GPIO34 to GND; lower Schottky clamp anode to GND/cathode to GPIO34, upper clamp anode to GPIO34/cathode to 3.3 V
- Verify the biased ADC node stays between 0.3 V and 3.0 V over the full input waveform before running PLL firmware

### Inverter Stage

- Reuse the Lab 10 DRV8833 breakout and 5 V / 100 mA current-limited supply for a separate resistor-load output demonstration
- No physical grid-tie or current-injection bridge is defined here

### Filter

- Reuse the Lab 10 two-inductor / 1 µF differential output filter for the resistor-load measurement

---

## System Schematic

```text
Signal source (≤1 V peak) → coupling capacitor / bias / clamps → ESP32 GPIO34
Lab 10 fixed-reference SPWM → DRV8833 H-bridge → two-inductor LC filter → 100 Ω load

The PLL algorithm and grid-current injection/current-control loop → Simulink only
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

This example assumes that the rotating reference frame is aligned with the grid-voltage vector and uses a consistent transform scaling. With a different alignment or scaling convention, the $d$ and $q$ values will differ. Under the chosen alignment, the approximately DC quantities are easier to regulate with PI controllers.

---

## L-Filter Transfer Function Derivation

The grid-side circuit consists of the inverter output voltage $V_{inv}$, a series inductor $L$ with winding resistance $R$, and the grid voltage $V_{grid}$.

Applying KVL around the loop:

$$
V_{inv} - V_{grid} = L\frac{di}{dt} + Ri
$$

Taking the Laplace transform (zero initial conditions):

$$
V_{inv}(s) - V_{grid}(s) = (Ls + R)\,I(s)
$$

The transfer function from net voltage to current is:

$$
\boxed{G(s) = \frac{I(s)}{V_{inv}(s) - V_{grid}(s)} = \frac{1}{Ls + R}}
$$

With $L = 1\ \text{mH}$ and $R = 1\ \Omega$:

$$
G(s) = \frac{1}{0.001s + 1}
$$

This is the denominator `[0.001, 1]` used in the Simulink current controller model.

The grid voltage $V_{grid}$ acts as a disturbance input. The current controller must reject this disturbance while tracking the current reference.

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

This is a simplified current loop. Practical dq controllers commonly add grid-voltage feedforward, cross-coupling compensation, current limiting, and anti-windup. These terms are omitted here so the L-filter plant and PI action remain visible.

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
| Amplitude | `1` |
| Frequency (rad/s) | `2*pi*50` |
| Phase (rad) | `0` |

#### Step 4 — Set Sine Wave (SPWM Carrier) parameters

| Parameter | Value |
|-----------|-------|
| Amplitude | `1` |
| Frequency (rad/s) | `2*pi*20000` |
| Phase (rad) | `pi/2` |

> This uses a sine-carrier approximation for simplicity. Real SPWM uses a triangular carrier — for a true triangular carrier, replace this Sine Wave block with a **Repeating Sequence** block (Simulink → Sources) configured as a triangle wave at the same 20 kHz frequency.

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
    <tr><td>SPWM carrier frequency (Hz)</td><td>20 000</td></tr>
    <tr><td>Grid frequency (Hz)</td><td>50</td></tr>
  </tbody>
</table>
</div>

---

## Experiment 1 - PLL Input Interface

### Objective

Build and verify the protected low-voltage input interface. PLL angle tracking is simulation-only because this repository does not include validated ESP32 PLL firmware.

---

### Procedure

1. Set the function generator to a 50 Hz sine wave and adjust it to no more than **1.0 V peak**. Measure its actual output with the oscilloscope before wiring it to the ESP32.
2. Connect generator output through a 1 µF series capacitor and 10 kΩ resistor to GPIO34. Connect 100 kΩ from GPIO34 to 3.3 V and 100 kΩ from GPIO34 to GND.
3. Add a lower Schottky clamp with anode at GND and cathode at GPIO34, and an upper clamp with anode at GPIO34 and cathode at 3.3 V.
4. Connect generator return, ESP32 GND, and scope ground to the same signal ground. Keep the generator connected only to the protected input; never connect it to either H-bridge output.
5. Before connecting GPIO34, measure the node relative to GND and verify the complete waveform stays between 0.3 V and 3.0 V. Record its frequency and voltage range. Keep PLL angle tracking in Simulink; the function generator is only a low-voltage signal source, not a grid source.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 1 V/div | 1 V/div |
| Horizontal scale | 5 ms/div | 5 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Observe

The scope should show the input sine wave and its biased GPIO34 waveform relative to GND. No Serial Monitor angle trace is available because this repository does not include PLL firmware.

---

### Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>Measured grid frequency</td><td><input class="result-input" id="lab17-exp1-freq" placeholder="Hz"></td></tr>
    <tr><td>GPIO34 minimum voltage</td><td><input class="result-input" id="lab17-exp1-vmin" placeholder="V"></td></tr>
    <tr><td>GPIO34 maximum voltage</td><td><input class="result-input" id="lab17-exp1-vmax" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 2 - SPWM Generation

### Objective

Observe the Lab 10 SPWM output. Its 50 Hz reference is fixed locally and is not synchronized to the PLL input.

---

### Procedure

1. Use the Lab 10 two-input SPWM sketch, which generates a fixed 50 Hz reference with a 20 kHz carrier; do not treat this output as PLL-synchronized.
2. Connect a scope probe tip to GPIO18 or GPIO19 and its ground clip to circuit GND only.
3. Set horizontal scale to **2 ms/div** for the 50 Hz envelope; use a shorter time base to inspect the carrier pulses.

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

### Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Expected</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>PWM carrier frequency</td><td>~20 kHz</td><td><input class="result-input" id="lab17-exp2-carrier" placeholder="Hz"></td></tr>
    <tr><td>Modulation index</td><td>~0.4 for the Lab 10 low-voltage output demonstration</td><td><input class="result-input" id="lab17-exp2-modindex" placeholder=""></td></tr>
    <tr><td>Output period</td><td>~20 ms</td><td><input class="result-input" id="lab17-exp2-period" placeholder="ms"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 3 - Inverter Output

### Objective

Measure the filtered inverter output voltage.

---

### Connections

```text
CH1 tip ─────────► Filtered OUT_A
CH2 tip ─────────► Filtered OUT_B
Both probe grounds ─► Circuit GND
Scope math ──────► CH1 − CH2 (differential load voltage)
```

Reuse the Lab 10 5 V / 100 mA DRV8833 stage and 100 Ω load. Do not connect the inverter output to the function generator or to mains.

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

Simulate grid-current regulation and verify tracking. No physical grid-current injection is defined in this lab.

!!! info "Simulation only"
  Use the 0.5 A, 1.0 A, and 1.5 A setpoints only in the Simulink current-controller model. Do not connect the inverter output to a function generator, AC source, or mains, and do not apply these setpoints to the Lab 10 low-current driver/load.

---

### Setpoint Tests

In the Simulink current-controller model, test the following references:

```text
0.5 A

1.0 A

1.5 A
```

For each setpoint, record the simulated current response. Do not use an ACS712 5 A module to measure the Lab 10 low-current load.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Current Reference (simulation)</th><th>Simulated Current</th></tr></thead>
  <tbody>
    <tr><td>0.5 A</td><td><input class="result-input" id="lab17-exp4-i05" placeholder="A"></td></tr>
    <tr><td>1.0 A</td><td><input class="result-input" id="lab17-exp4-i10" placeholder="A"></td></tr>
    <tr><td>1.5 A</td><td><input class="result-input" id="lab17-exp4-i15" placeholder="A"></td></tr>
  </tbody>
</table>
</div>

---

## MATLAB Comparison

After completing Experiment 4 in Simulink, enter its current tracking data and compare against the PI response model. This script does not represent a physical grid connection.

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

✅ Signal generator output is 50 Hz and no more than 1.0 V peak

✅ GPIO34 input node is biased and stays between 0.3 V and 3.0 V

PLL firmware is not included in this repository; verify tracking in the Simulink model.

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

✅ Function generator limited to a scope-verified 1.0 V peak or less

✅ GPIO34 input verified between 0.3 V and 3.0 V before connection

✅ Lab 10 fixed-reference SPWM observed separately from the PLL input

✅ DRV8833 H-bridge connected to the 100 Ω load with a 5 V / 100 mA supply limit

✅ Differential output measured with both probe grounds at circuit GND and CH1−CH2 math

✅ Grid current injection and current-loop tests kept in Simulink only

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
- Microgrid Operation
