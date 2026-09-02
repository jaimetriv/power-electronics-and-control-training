# Project 18 - Grid-Forming Voltage Source Converter (VSC)

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
- 17_Grid_Following_VSC.md

---

## Objective

In this project you will learn:

- What a Grid-Forming Converter is
- How Grid-Forming differs from Grid-Following
- How an inverter creates voltage and frequency
- Voltage feedback control
- Frequency regulation
- SPWM implementation
- Droop control
- Virtual Synchronous Machine concepts
- Microgrid fundamentals

This project serves as the capstone project for the course.

---

## Safety Notice

```text
DO NOT CONNECT DIRECTLY TO MAINS VOLTAGE
```

All experiments must use:

- Low-voltage DC supplies
- Low-power loads
- Isolated laboratory circuits

Recommended:

```text
12 V DC Input

5–12 V RMS Output
```

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain Grid-Forming operation

✅ Generate AC voltage autonomously

✅ Implement SPWM

✅ Implement voltage feedback

✅ Regulate output voltage

✅ Explain droop control

✅ Understand Virtual Synchronous Machines

✅ Compare Grid-Following and Grid-Forming converters

---

## Introduction

Project 17 introduced Grid-Following Converters.

Those converters require an existing grid — they measure voltage and inject current.

A Grid-Forming converter instead creates its own voltage, frequency, and phase.

---

## Grid-Following versus Grid-Forming

| Feature | Grid-Following | Grid-Forming |
|---------|--------------|--------------|
| PLL Required | Yes | No |
| Existing Grid Required | Yes | No |
| Controls Current | Yes | Usually |
| Controls Voltage | No | Yes |
| Controls Frequency | No | Yes |
| Black Start | No | Yes |
| Islanded Operation | No | Yes |

---

## Complete System Architecture

```text
Voltage Reference
        │
        ▼
Frequency Generator (internal oscillator)
        │
        ▼
PI Voltage Controller
        │
        ▼
Modulation Index
        │
        ▼
SPWM Generator
        │
        ▼
H-Bridge (4 × IRLZ44N + IR2104 driver)
        │
        ▼
LC Filter
        │
        ▼
Load
        ▲
        │
Voltage Sensor (resistor divider → ADC)
        │
        └──────── Feedback
```

---

## Hardware Requirements

### Controller

```text
ESP32 DevKit V1  (recommended)
STM32 Nucleo     (alternative)
Arduino Mega     (alternative)
```

### Inverter Stage

- 4 × IRLZ44N MOSFETs
- IR2104 gate driver (recommended) or IR2110

### Sensors

- Voltage measurement: resistor divider
- Current measurement: ACS712 or ACS758

### LC Filter

- Inductor: 1 mH to 5 mH
- Capacitor: 1 µF film capacitor

### Test Equipment

- OWON HDS272S (recommended)
- DSO Nano (compatible)
- Multimeter
- 12 V bench power supply

---

## Complete Materials List

```text
ESP32 DevKit V1
IR2104 Gate Driver
4 × IRLZ44N MOSFETs
ACS712 Current Sensor
1 mH Inductor
1 µF Film Capacitor
470 µF Electrolytic Capacitor (DC link)
100 nF Ceramic Capacitor (DC link decoupling)
12 V Bench Supply
OWON HDS272S (or DSO Nano)
Breadboard and Jumper Wires
Multimeter
```

---

## Full H-Bridge Schematic

```text
              +Vdc (12 V)
                │
          ┌─────┴─────┐
          │           │
         Q1          Q2
          │           │
          ├─── LOAD ──┤
          │           │
         Q3          Q4
          │           │
          └─────┬─────┘
                │
               GND
```

---

## H-Bridge Operation

### Positive Half-Cycle

Turn ON Q1 and Q4.

Current flows:

```text
+Vdc → Q1 → Load → Q4 → GND
```

### Negative Half-Cycle

Turn ON Q2 and Q3.

Current flows in the opposite direction.

---

## Shoot-Through Warning

Never enable Q1 and Q3 simultaneously.

Never enable Q2 and Q4 simultaneously.

This creates a direct supply short circuit.

---

## Dead Time

A delay is inserted between switching events to prevent shoot-through.

Typical values:

```text
1 µs to 5 µs
```

---

## DC Link Circuit

Every practical inverter requires a DC-link capacitor mounted near the MOSFET bridge:

```text
+12 V Supply
      │
 470 µF Electrolytic  +  100 nF Ceramic  (in parallel)
      │
H-Bridge
```

---

## LC Output Filter

The H-Bridge output contains PWM ripple.

An LC filter smooths the waveform:

```text
H-Bridge
    │
    L (1 mH)
    │
    ├──── Load
    │
    C (1 µF)
    │
   GND
```

---

## Voltage Measurement Circuit

The ESP32 must never measure the inverter voltage directly.

Use a resistor divider to scale the output to the ADC range:

```text
Output Voltage
      │
    47 kΩ
      │──── ADC (ESP32 GPIO34)
    10 kΩ
      │
     GND
```

---

## LC Filter Transfer Function Derivation

The grid-forming inverter output stage is an LC filter driving a resistive load $R$.

Applying KVL around the inductor loop:

$$
V_{inv} = L\frac{di_L}{dt} + V_{OUT}
$$

Applying KCL at the output node (inductor current splits into capacitor current and load current):

$$
i_L = C\frac{dV_{OUT}}{dt} + \frac{V_{OUT}}{R}
$$

Differentiating the KCL equation and substituting into KVL:

$$
V_{inv} = LC\frac{d^2V_{OUT}}{dt^2} + \frac{L}{R}\frac{dV_{OUT}}{dt} + V_{OUT}
$$

Taking the Laplace transform:

$$
V_{inv}(s) = \left(LCs^2 + \frac{L}{R}s + 1\right)V_{OUT}(s)
$$

Rearranging to give the transfer function:

$$
G(s) = \frac{V_{OUT}(s)}{V_{inv}(s)} = \frac{1}{LCs^2 + \dfrac{L}{R}s + 1}
$$

Multiplying numerator and denominator by $R$:

$$
\boxed{G(s) = \frac{R}{LCRs^2 + Ls + R}}
$$

With $L = 1\ \text{mH}$, $C = 1\ \mu\text{F}$, $R = 220\ \Omega$:

$$
G(s) = \frac{220}{2.2 \times 10^{-7}s^2 + 10^{-3}s + 220}
$$

This is the denominator `[2.2e-7, 1e-3, 220]` used in the Simulink voltage controller model.

The natural frequency of the LC filter is:

$$
f_n = \frac{1}{2\pi\sqrt{LC}} = \frac{1}{2\pi\sqrt{10^{-3} \times 10^{-6}}} \approx 5033\ \text{Hz}
$$

The voltage controller bandwidth must remain well below $f_n$ to avoid exciting the filter resonance.

---

## Voltage Reference

The inverter generates:

$$
v^*(t) = V_m \sin(\omega t)
$$

Where:

- $V_m$ = Desired Peak Voltage
- $\omega = 2\pi f$ = Angular Frequency

No PLL is required — the inverter generates its own electrical angle:

$$
\theta = \omega t
$$

---

## Digital SPWM Implementation

```cpp
// Update angle each sample period
theta += omega * Ts;

// Wrap angle to keep within 0 to 2π
if (theta > 2 * PI)
{
    theta -= 2 * PI;
}

// Generate sine reference
float reference = sin(theta);

// Convert to PWM duty cycle (0–255)
int pwm = (int)(127 + 127 * reference);
pwm = constrain(pwm, 0, 255);
```

Where:

- `theta` = Electrical Angle
- `omega` = Angular Frequency ($2\pi \times 50$)
- `Ts` = Sampling Time
- `reference` = Sine Reference
- `pwm` = PWM Duty Cycle

---

## Voltage Control Loop

```text
Voltage Reference → [−] → PI Controller → Modulation Index → SPWM → Inverter → Output Voltage
                       ↑                                                               │
                       └──────────────────── Voltage Sensor ──────────────────────────┘
```

---

## PI Voltage Controller

$$
u = K_P e + K_I \int e\,dt
$$

The PI controller removes steady-state error, improves regulation, and compensates for load changes.

---

## Droop Control

Grid-Forming converters often emulate synchronous generators using droop control.

### Active Power Droop

$$
f = f_0 - K_P(P - P_0)
$$

### Reactive Power Droop

$$
V = V_0 - K_Q(Q - Q_0)
$$

Droop allows multiple inverters to share loads automatically without communication.

---

## Virtual Synchronous Machine (VSM)

A Virtual Synchronous Machine emulates the behaviour of a rotating generator using software.

Benefits:

✅ Synthetic Inertia

✅ Better Frequency Stability

✅ Improved Dynamic Response

✅ Enhanced Microgrid Performance

---

## Simulink Simulation

Before building, simulate the LC filter response, the PI voltage controller step response, and the droop characteristic in Simulink.

All three are signal-only models — no Simscape electrical components are needed.

---

### Model 1 — PI Voltage Controller

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `gfm_voltage_control.slx`.

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

Step block (voltage reference):

| Parameter | Value |
|-----------|-------|
| Step time | `0` s |
| Final value | `5` |

Gain block 1 (Kp): `3`

Gain block 2 (Ki): `100`

Sum block 1 (error junction): signs `+-`

Sum block 2 (PI sum): signs `++`

Transfer Fcn (LC filter with load `R/(LCRs² + Ls + R)`):

| Parameter | Value |
|-----------|-------|
| Numerator | `[220]` |
| Denominator | `[2.2e-7, 1e-3, 220]` |

> Numerator = R\_load = 220. Denominator = `[L×C×R, L, R]` = `[1e-3×1e-6×220, 1e-3, 220]` = `[2.2e-7, 1e-3, 220]`

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

#### Step 7 — Run for each gain set

| Kp | Ki | Expected behaviour |
|----|----|--------------------|
| `1` | `10` | Slow, minimal overshoot |
| `3` | `100` | Balanced |
| `10` | `500` | Fast, possible overshoot |

Change Kp and Ki Gain block values for each run.

---

### Model 2 — Droop Characteristic

#### Step 1 — Create a new Simulink model

1. In MATLAB, click **Home → New → Simulink Model**.
2. Save as `gfm_droop.slx`.

#### Step 2 — Add blocks

| Block | Library path | Quantity |
|-------|-------------|----------|
| Constant | Simulink → Sources | 3 |
| Gain | Simulink → Math Operations | 2 |
| Product | Simulink → Math Operations | 2 |
| Sum | Simulink → Math Operations | 2 |
| Scope | Simulink → Sinks | 1 |

#### Step 3 — Set block parameters

| Block | Value | Purpose |
|-------|-------|---------|
| Constant 1 | `50` | Nominal frequency f₀ |
| Constant 2 | `0.1` | Droop coefficient Kd1 |
| Constant 3 | `0.2` | Droop coefficient Kd2 |
| Gain 1 | `5` | Active power P (W) |
| Gain 2 | `5` | Active power P (W) |

#### Step 4 — Wire the droop model

```text
Constant 1 (f0=50) → Sum1 (+) input 1
Gain 1 (P) → Product1 input 1
Constant 2 (Kd1) → Product1 input 2
Product1 output → Sum1 (−) input
Sum1 output → Scope input 1   [Inverter 1 frequency]

Constant 1 (f0=50) → Sum2 (+) input 1
Gain 2 (P) → Product2 input 1
Constant 3 (Kd2) → Product2 input 2
Product2 output → Sum2 (−) input
Sum2 output → Scope input 2   [Inverter 2 frequency]
```

> Two Product blocks compute $P \times K_d$ for each inverter — this is the multiplication in the droop equation $f = f_0 - K_d(P - P_0)$. Constant blocks have no input port, so Kd1/Kd2 must feed a Product block rather than being wired directly in series with Gain 1/Gain 2.

> This is a static calculation — the Scope shows the steady-state frequency for each inverter at the given power level.

#### Step 5 — Configure the Scope

Set **Number of input ports** to `2`.

#### Step 6 — Configure simulation settings

| Parameter | Value |
|-----------|-------|
| Solver | `ode45` |
| Stop time | `1` s |

#### Step 7 — Run and observe

Both Scope channels should show constant values below 50 Hz.

Inverter 2 (Kd = 0.2) will show a lower frequency than Inverter 1 (Kd = 0.1) at the same power level, demonstrating that higher droop coefficient → greater frequency deviation per watt.

---

### Prediction Table

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Predicted value</th></tr></thead>
  <tbody>
    <tr><td>PI voltage controller rise time</td><td><input class="result-input" id="lab18-sim-rise" placeholder="s"></td></tr>
    <tr><td>PI voltage controller overshoot (%)</td><td><input class="result-input" id="lab18-sim-os" placeholder="%"></td></tr>
    <tr><td>LC filter natural frequency (Hz)</td><td><input class="result-input" id="lab18-sim-fn" placeholder="Hz"></td></tr>
    <tr><td>Inverter 1 frequency at P = 5 W (Hz)</td><td><input class="result-input" id="lab18-sim-f1" placeholder="Hz"></td></tr>
    <tr><td>Inverter 2 frequency at P = 5 W (Hz)</td><td><input class="result-input" id="lab18-sim-f2" placeholder="Hz"></td></tr>
  </tbody>
</table>
</div>

---

## Recommended Build Stages

### Stage 1

Generate a 50 Hz reference signal.

Verify frequency and amplitude on the oscilloscope.

### Stage 2

Generate SPWM.

Verify PWM carrier frequency and varying duty cycle.

### Stage 3

Build and test the H-Bridge.

Verify alternating output voltage.

### Stage 4

Install the LC Filter.

Verify smooth AC voltage output.

### Stage 5

Implement voltage measurement.

Verify ADC accuracy against multimeter reading.

### Stage 6

Implement PI voltage control.

Verify stable regulation.

### Stage 7

Implement droop control.

Study power-sharing behaviour.

---

## Experiment 1 - Generate AC Voltage

### Objective

Generate a stable 50 Hz AC voltage waveform from the inverter.

---

### Connections

```text
Probe Tip  ──────► Inverter output (after LC filter)
Probe GND  ──────► Circuit GND
```

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 5 ms/div | 5 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | AC | AC |

---

### Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Frequency</td><td><input class="result-input" id="lab18-exp1-freq" placeholder="Hz"></td></tr>
    <tr><td>RMS Voltage</td><td><input class="result-input" id="lab18-exp1-vrms" placeholder="V"></td></tr>
    <tr><td>Peak Voltage</td><td><input class="result-input" id="lab18-exp1-vpeak" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 2 - Load Regulation

### Objective

Observe how output voltage changes with different load resistances, with and without the PI voltage controller.

---

### Test Loads

```text
100 Ω

220 Ω

470 Ω
```

For each load, measure the output voltage with the PI controller active.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Load</th><th>Output Voltage</th></tr></thead>
  <tbody>
    <tr><td>100 Ω</td><td><input class="result-input" id="lab18-exp2-v100" placeholder="V"></td></tr>
    <tr><td>220 Ω</td><td><input class="result-input" id="lab18-exp2-v220" placeholder="V"></td></tr>
    <tr><td>470 Ω</td><td><input class="result-input" id="lab18-exp2-v470" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 3 - PI Tuning

### Objective

Observe how PI gains affect voltage regulation quality.

---

### Procedure

Step through the following gain sets and record the behaviour:

<div class="result-block">
<table>
  <thead><tr><th>Kp</th><th>Ki</th><th>Behaviour</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>10</td><td><input class="result-input" id="lab18-exp3-beh1" placeholder=""></td></tr>
    <tr><td>3</td><td>100</td><td><input class="result-input" id="lab18-exp3-beh2" placeholder=""></td></tr>
    <tr><td>10</td><td>500</td><td><input class="result-input" id="lab18-exp3-beh3" placeholder=""></td></tr>
  </tbody>
</table>
</div>

Measure for each:

- Overshoot
- Settling time
- Voltage regulation error
- Stability

---

## MATLAB Comparison

After completing the experiments, enter your measured load regulation data and PI step response to compare against simulation.

```matlab
% Enter your system parameters
Vm     = 5;
L      = 1e-3;
C      = 1e-6;
Kp_v   = 3;
Ki_v   = 100;

% Enter measured Vout for each load (Experiment 2)
R_loads  = [100, 220, 470];          % Ohm
V_meas   = [4.6, 4.85, 4.95];       % V peak — replace with your readings

% Simulate Vout vs load
s = tf('s');
V_sim = zeros(1, numel(R_loads));
for k = 1:numel(R_loads)
    R = R_loads(k);
    G_lc = R / (L*C*R*s^2 + L*s + R);
    C_pi = Kp_v + Ki_v/s;
    T_v  = feedback(C_pi * G_lc, 1);
    V_sim(k) = Vm * dcgain(T_v);
end

figure;
subplot(2,1,1);
plot(R_loads, V_sim, 'b-o', R_loads, V_meas, 'r-s', 'LineWidth', 1.5);
legend('Simulated','Measured'); grid on;
xlabel('Load Resistance (\Omega)'); ylabel('Output Voltage (V)');
title('Load Regulation: Simulated vs Measured');
yline(Vm, 'k--');

% Enter measured PI step response (Experiment 3)
t_meas = [0, 0.002, 0.005, 0.010, 0.015, 0.020, 0.030];  % s — replace
v_meas = [0, 1.5,   4.2,   5.3,   5.1,   5.0,   5.0];    % V — replace

R_nom = 220;
G_lc  = R_nom / (L*C*R_nom*s^2 + L*s + R_nom);
C_pi  = Kp_v + Ki_v/s;
T_v   = feedback(C_pi * G_lc, 1);
[y_sim, t_sim] = step(Vm * T_v, 0:1e-5:0.05);

subplot(2,1,2);
plot(t_sim, y_sim, 'b-', 'LineWidth', 1.5); hold on;
plot(t_meas, v_meas, 'ro--', 'MarkerSize', 6);
yline(Vm, 'k--');
legend('Simulated','Measured'); grid on;
xlabel('Time (s)'); ylabel('Voltage (V)');
title(sprintf('PI Voltage Step Response  Kp=%.0f Ki=%.0f', Kp_v, Ki_v));

% Metrics
reg_pct = abs(V_meas - Vm) ./ Vm * 100;
fprintf('\nVoltage regulation error:\n');
for k = 1:numel(R_loads)
    fprintf('  R=%3d Ohm: sim=%.3fV  meas=%.3fV  error=%.1f%%\n', ...
        R_loads(k), V_sim(k), V_meas(k), reg_pct(k));
end
```

### Reflection

1. Does voltage regulation worsen at lower load resistance (higher current)? What physical effect causes this?
2. How does the LC filter natural frequency relate to the PI controller bandwidth? What happens if the controller bandwidth exceeds the filter resonance?
3. How would adding a second inverter with a different droop coefficient change the load-sharing behaviour?

---

## Troubleshooting

### SPWM Not Operating Correctly

Check:

✅ Angle increment `omega * Ts` correct for 50 Hz

✅ PWM output pin configured correctly

✅ Oscilloscope showing varying pulse widths

---

### H-Bridge Not Switching

Check:

✅ Dead time implemented

✅ Gate driver supply voltage correct

✅ MOSFET pinout correct (G, D, S)

---

### Output Voltage Unstable

Check:

✅ PI gains not too large

✅ LC filter installed

✅ Voltage sensor calibrated

---

### Troubleshooting Checklist

✅ SPWM operating correctly

✅ Dead time implemented

✅ H-Bridge switching correctly

✅ LC filter installed

✅ Voltage sensor calibrated

✅ PI controller operating

✅ Output frequency stable at 50 Hz

✅ Output voltage regulated

✅ Safe load connection verified

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab18">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab18">✕ Clear All Results</button>
</div>

---

## Knowledge Check

### Question 1

What is the primary difference between Grid-Following and Grid-Forming control?

---

### Question 2

Why is a PLL unnecessary in a Grid-Forming converter?

---

### Question 3

What does the voltage controller regulate?

---

### Question 4

What is droop control?

---

### Question 5

What is a Virtual Synchronous Machine?

---

### Question 6

Your MATLAB simulation predicted less than 1% voltage regulation error across all three loads, but the physical inverter showed 8% error at the 100 Ω load. Identify two physical causes and explain what change to the controller or hardware would reduce the error.

---

## Project Summary

In this project you learned:

✅ Grid-Forming operation

✅ Autonomous AC generation

✅ Voltage regulation

✅ Frequency regulation

✅ SPWM implementation

✅ Droop control

✅ Virtual Synchronous Machines

✅ Microgrid fundamentals

This project combines:

✅ PWM

✅ Inverters

✅ MOSFET Switching

✅ PI Controllers

✅ Power Electronics

✅ System Identification

✅ Controller Design

✅ AC Systems

✅ Renewable Energy Systems

into a complete Grid-Forming Voltage Source Converter architecture.

You have now progressed from:

```text
Basic PWM Generation
```

to:

```text
Autonomous AC Grid Creation
```

using the same fundamental principles employed in modern:

- Battery Energy Storage Systems
- Grid-Forming Inverters
- Standalone Microgrids
- Renewable Energy Plants
- Future Electrical Power Systems
