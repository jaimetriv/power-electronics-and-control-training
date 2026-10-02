# Project 18 - Grid-Forming Voltage Source Converter (VSC)

---

## Reading Before the Lab

Read _Fundamentals of Electric Circuits_ by Alexander and Sadiku, Chapter 12 for three-phase voltage/current relationships. Then read _Voltage-Sourced Converters in Power Systems_ by Yazdani and Iravani, Chapters 5–7, for islanded operation, VSC control, voltage control, LC filters, droop control, and grid-forming converters. Predict how voltage and frequency change with load before testing the converter.

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
- Microgrid operation

This project serves as the capstone project for the course.

---

## Safety Notice

```text
DO NOT CONNECT DIRECTLY TO MAINS VOLTAGE
```

For the physical output demonstration, reuse the Lab 10 DRV8833 stage with a 5.0 V isolated bench supply limited to 0.10 A and a load always connected. Do not build the discrete IRLZ44N/IR2104 bridge from this page. PI voltage control and droop power-sharing remain simulation-only until complete firmware and an independently checked gate-drive design are available.

Recommended:

```text
5 V DC Input, 0.10 A current limit

2 V peak nominal differential output (1.41 V RMS for a sine wave)
```

The DRV8833 supply range is 2.7-10.8 V; use 5 V only. With modulation index 0.4, the ideal fundamental is about 2 V peak. Never connect this inverter or its load to mains, a function generator, or another AC source.

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
DRV8833 H-Bridge (5 V, 100 mA current limit)
        │
        ▼
LC Filter
        │
        ▼
Load
        ▲
        │
Differential/isolated voltage sensor → protected ADC interface
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

- DRV8833 H-bridge breakout with labeled input/output pins and 3.3 V logic compatibility; reuse the Lab 10 board
- Do not substitute a discrete IRLZ44N/IR2104 bridge in this low-voltage exercise

### Sensors

- Use two oscilloscope channels with both probe grounds at circuit GND and display CH1−CH2; if unavailable, use a rated differential probe or simulate
- ESP32 ADC feedback is simulation-only in this project; no ADC sensing circuit is part of the physical build

### LC Filter

- Two matched 1 mH series inductors, one in each bridge output leg; each rated for at least 0.5 A, no more than 1 Ω DCR, and at least 200 kHz self-resonant frequency
- 1 µF film capacitor rated at least 25 V across the filtered output
- 100 Ω, 0.25 W or higher load resistor across the filtered output; 220 Ω and 470 Ω resistors may be used for the load comparison

### Test Equipment

- OWON HDS272S (recommended)
- DSO Nano (compatible)
- Multimeter
- Isolated 0-30 V / 0-3 A bench supply with CC mode, set to 5.0 V / 0.10 A maximum

---

## Complete Materials List

```text
ESP32 DevKit V1
1 × DRV8833 H-Bridge Breakout (reused from Lab 10)
2 × Matched 1 mH Output Inductors (≥0.5 A, ≤1 Ω DCR, ≥200 kHz SRF)
1 µF / 25 V Film Capacitor (filter)
100 Ω / 0.25 W Load Resistor (plus optional 220 Ω and 470 Ω loads)
100 µF / 10 V Electrolytic Capacitor (DC link)
100 nF Ceramic Capacitor (DC link decoupling)
5 V Bench Supply, current limited to 0.10 A
OWON HDS272S (or DSO Nano)
Breadboard and Jumper Wires
Multimeter
```

---

## Full H-Bridge Schematic

```text
          5 V → DRV8833 VM; GND → circuit GND
          ESP32 GPIO18/GPIO19 → DRV8833 AIN1/AIN2; 3.3 V → nSLEEP
          DRV8833 AOUT1 → L_A 1 mH → OUT_A
          DRV8833 AOUT2 → L_B 1 mH → OUT_B
          1 µF and selected load resistor in parallel from OUT_A to OUT_B
          100 µF and 100 nF in parallel from VM to GND
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

The DRV8833 is an integrated driver; use its documented input truth table and internal protection. This lab's firmware does not drive discrete MOSFET gates. A discrete bridge substitution requires a separately reviewed gate-drive design with verified dead time and fault protection.

---

## DC Link Circuit

Every practical inverter requires a DC-link capacitor mounted near the MOSFET bridge:

```text
+5 V current-limited supply
      │
 100 µF Electrolytic  +  100 nF Ceramic  (in parallel)
      │
H-Bridge
```

---

## LC Output Filter

The full H-bridge output is differential: neither load terminal is circuit ground. Use one series inductor in each bridge output leg, then connect the load and filter capacitor across the two filtered output terminals. The 1 µF capacitor is in parallel with the load.

```text
Bridge OUT_A ── L_A ──┬──── R_load ────┬── L_B ── Bridge OUT_B
             │                │
             └────── C_f ─────┘
```

The single-phase model below uses $L_{eq}=L_A+L_B$ as the total differential series inductance. It is not a ground-referenced half-bridge model.

---

## Voltage Measurement Circuit

Do not connect either bridge output to an ESP32 ADC. For scope measurement, connect CH1 tip to filtered OUT_A and CH2 tip to filtered OUT_B; connect both probe ground clips to circuit GND and display CH1−CH2. Never attach a probe ground clip to OUT_A or OUT_B. If the scope cannot display CH1−CH2, use a rated differential probe or run the measurement in simulation.

## LC Filter Model

Let $L_{eq}=L_A+L_B$ be the total differential series inductance. Applying KVL across the differential filter gives:

$$
V_{inv,diff}=L_{eq}\frac{di_L}{dt}+V_{OUT}
$$

Applying KCL at the output node (inductor current splits into capacitor and load current):

$$
i_L = C_f\frac{dV_{OUT}}{dt} + \frac{V_{OUT}}{R}
$$

Differentiating the KCL equation and substituting into KVL:

$$
V_{inv,diff} = L_{eq}C_f\frac{d^2V_{OUT}}{dt^2} + \frac{L_{eq}}{R}\frac{dV_{OUT}}{dt} + V_{OUT}
$$

Taking the Laplace transform:

$$
V_{inv,diff}(s) = \left(L_{eq}Cs^2 + \frac{L_{eq}}{R}s + 1\right)V_{OUT}(s)
$$

Rearranging to give the transfer function:

$$
G(s) = \frac{V_{OUT}(s)}{V_{inv,diff}(s)} = \frac{1}{L_{eq}C_fs^2 + \dfrac{L_{eq}}{R}s + 1}
$$

Multiplying numerator and denominator by $R$:

$$
\boxed{G(s) = \frac{R}{L_{eq}C_fRs^2 + L_{eq}s + R}}
$$

For two $1\ \mathrm{mH}$ output inductors, use $L_{eq}=2\ \mathrm{mH}$, $C_f=1\ \mathrm{\mu F}$, and $R=220\ \Omega$:

$$
G(s) = \frac{220}{4.4 \times 10^{-7}s^2 + 2\times10^{-3}s + 220}
$$

This is the denominator `[4.4e-7, 2e-3, 220]` used in the Simulink voltage controller model.

The natural frequency of the LC filter is:

$$
f_n = \frac{1}{2\pi\sqrt{L_{eq}C_f}} = \frac{1}{2\pi\sqrt{2\times10^{-3} \times 10^{-6}}} \approx 3560\ \text{Hz}
$$

The voltage-controller bandwidth must remain well below $f_n$ to avoid exciting the filter resonance. This ideal LC estimate does not include damping from the real load, component losses, or sensor/control delay.

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

This snippet generates one sine-referenced duty value only; it does not drive a bridge. For the physical open-loop waveform demonstration, reuse the Lab 10 DRV8833 two-input SPWM sketch with a 50 Hz reference and modulation index 0.4. The PI voltage-control and droop stages below are signal-only simulations; do not enable an unvalidated hardware feedback loop.

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

Here $K_P$ has units of frequency per watt (or per unit power). The sign assumes that increasing delivered active power reduces the commanded frequency.

### Reactive Power Droop

$$
V = V_0 - K_Q(Q - Q_0)
$$

Here $K_Q$ has units of volts per var (or per unit reactive power). The signs depend on the chosen current, power, and voltage conventions.

Droop allows multiple inverters to share loads automatically without communication.

Black start means energising a previously de-energised network without an external grid reference. Islanded operation means supplying a local load while electrically separated from the utility grid.

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
| Final value | `2` |

Gain block 1 (Kp): `3`

Gain block 2 (Ki): `100`

Sum block 1 (error junction): signs `+-`

Sum block 2 (PI sum): signs `++`

Transfer Fcn (LC filter with load `R/(LCRs² + Ls + R)`):

| Parameter | Value |
|-----------|-------|
| Numerator | `[220]` |
| Denominator | `[4.4e-7, 2e-3, 220]` |

> Numerator = $R_{load}=220$. Denominator = `[L_eq×C_f×R, L_eq, R]` = `[2e-3×1e-6×220, 2e-3, 220]` = `[4.4e-7, 2e-3, 220]`.

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

Run the Lab 10 SPWM signal generator with modulation index 0.4 and a 50 Hz reference. Verify the 20 kHz carrier and 50 Hz envelope before connecting the driver.

### Stage 2

Keep the DRV8833 VM supply disabled. Power the ESP32 by USB, connect GPIO18/GPIO19 to the labeled AIN1/AIN2 pins, and verify the two 3.3 V PWM logic signals relative to circuit GND. Set the bench supply to 5.0 V with a 0.10 A current limit and leave its output disabled.

### Stage 3

With the LC filter disconnected, connect the 100 Ω load directly across DRV8833 AOUT1/AOUT2 before enabling the supply. Enable the 5 V / 0.10 A-limited supply, confirm it is not continuously in current limit, then disable the supply before changing the wiring. Test the bridge only with this load connected; never run it unloaded.

### Stage 4

Power off, install the two matched 1 mH inductors and 1 µF capacitor across OUT_A/OUT_B, and measure the filtered differential waveform.

### Stage 5

Measure both filtered output legs with scope channels referenced to circuit GND. Use CH1−CH2 math for the differential voltage; do not connect either bridge output to an ESP32 ADC pin.

### Stage 6

Run the PI voltage controller in Simulink only. The code fragment on this page is not a complete hardware controller.

### Stage 7

Study droop and power sharing in Simulink only; no second physical inverter is specified.

---

## Experiment 1 - Generate AC Voltage

### Objective

Measure the filtered, open-loop 50 Hz differential output from the 5 V DRV8833 inverter.

### Power-Up Procedure

1. With the bench supply disabled, check the DRV8833 pin labels, capacitor polarity, filter wiring, and the 100 Ω load across OUT_A and OUT_B.
2. Set the isolated supply to 5.0 V and 0.10 A current limit. Keep the load connected at all times.
3. Connect ESP32 GND, DRV8833 GND, and supply negative. Connect CH1 and CH2 probe grounds to circuit GND only.
4. Start with modulation index 0.4 using the Lab 10 SPWM sketch. Enable the supply and confirm it is not continuously in current limit.
5. Measure the filtered output. Disable the supply and discharge the DC-link capacitor before changing wiring or loads.

### Oscilloscope Connections

```text
CH1 tip ─────────► Filtered OUT_A
CH2 tip ─────────► Filtered OUT_B
Both probe grounds ► Circuit GND
Scope math ──────► CH1−CH2
```

Never connect a standard probe ground clip to OUT_A or OUT_B. If the scope cannot display CH1−CH2, use a rated differential probe or perform this measurement in simulation.

### Oscilloscope Settings

| Setting | OWON HDS272S |
|---------|--------------|
| Vertical scale | 1 V/div |
| Horizontal scale | 5 ms/div |
| Trigger | Edge, Rising |
| Coupling | AC for output waveform; DC to inspect offset |

### Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Expected</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Frequency</td><td>50 Hz</td><td><input class="result-input" id="lab18-exp1-freq" placeholder="Hz"></td></tr>
    <tr><td>Differential RMS voltage</td><td>About 1.41 V</td><td><input class="result-input" id="lab18-exp1-vrms" placeholder="V"></td></tr>
    <tr><td>Differential peak voltage</td><td>About 2 V</td><td><input class="result-input" id="lab18-exp1-vpeak" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 2 - Load Regulation

### Objective

Observe open-loop output changes as load resistance varies. Closed-loop PI load regulation is a Simulink-only exercise.

---

### Test Loads

```text
100 Ω

220 Ω

470 Ω
```

With modulation index fixed at 0.4, measure the differential output at 100 Ω, 220 Ω, and 470 Ω. Power off before changing loads. Do not remove the load or exceed the 0.10 A supply limit.

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

Use the Simulink model to observe how PI gains affect voltage regulation quality. Do not apply these gains to the physical inverter.

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

- Settling time
- Voltage regulation error

---

## MATLAB Comparison

This signal-level model compares the ideal open-loop filter response with the peak voltages measured in Experiment 2. Replace the `NaN` entries with your measured values. The PI response is a separate simulation and is not applied to the physical bridge. Requires Control System Toolbox.

```matlab
Leq = 2e-3;                     % total differential inductance (H)
Cf = 1e-6;                      % filter capacitance (F)
Vref_peak = 2;                  % nominal differential peak (V)
R_loads = [100, 220, 470];      % load resistance (ohm)
V_measured_peak = [NaN, NaN, NaN]; % replace with Experiment 2 readings

s = tf('s');
V_ideal_peak = zeros(size(R_loads));
for k = 1:numel(R_loads)
    R = R_loads(k);
    G_lc = R / (Leq*Cf*R*s^2 + Leq*s + R);
    V_ideal_peak(k) = Vref_peak * dcgain(G_lc);
end

figure;
plot(R_loads, V_ideal_peak, 'b-o', ...
    R_loads, V_measured_peak, 'r-s', 'LineWidth', 1.5);
legend('Ideal model', 'Measured');
grid on;
xlabel('Load resistance (ohm)');
ylabel('Differential peak voltage (V)');
title('Open-Loop Load Response');

% Signal-level PI simulation only; do not apply it to the physical bridge.
Kp_v = 3;
Ki_v = 100;
R_nom = 220;
G_lc = R_nom / (Leq*Cf*R_nom*s^2 + Leq*s + R_nom);
C_pi = Kp_v + Ki_v/s;
T_v = feedback(C_pi * G_lc, 1);
[y_pi, t_pi] = step(Vref_peak * T_v, 0:1e-5:0.05);

figure;
plot(t_pi, y_pi, 'b-', 'LineWidth', 1.5);
hold on;
yline(Vref_peak, 'k--');
grid on;
xlabel('Time (s)');
ylabel('Differential voltage (V)');
title('Simulated PI Voltage Step Response');
```

## Reflection

1. Does the open-loop output change more at lower load resistance (higher current)? Which real component losses could cause the change?
2. How does the LC filter natural frequency relate to PI-controller bandwidth? What could happen if controller bandwidth approaches the filter resonance?
3. How would a second inverter with a different droop coefficient affect load sharing in the simulation?

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

✅ DRV8833 breakout pin labels and input truth table checked

✅ nSLEEP held high at 3.3 V and common logic/power ground connected

✅ Bench supply output enabled at 5.0 V with a 0.10 A limit

---

### Output Voltage Unstable

Check:

✅ 100 Ω load remains connected across the filtered differential output

✅ Both filter inductors and capacitor are connected to the correct differential nodes

✅ Scope channels are ground-referenced to circuit GND; differential output uses CH1−CH2

---

### Troubleshooting Checklist

✅ DRV8833 outputs measured with both probe grounds at circuit GND

✅ 100 Ω load stays connected and supply limit remains at 0.10 A

✅ Two matched output inductors and 1 µF film capacitor installed for filtered tests

✅ PI voltage control and droop remain Simulink-only

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

