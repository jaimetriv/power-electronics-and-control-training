# Project 04 - MOSFET Fundamentals and Electronic Switching

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md

---

## Objective

In this project you will learn:

- What a MOSFET is
- How a MOSFET works
- How a microcontroller controls a MOSFET
- Why MOSFETs are used in power electronics
- How PWM and MOSFETs work together
- How to measure switching signals with the OWON HDS272S oscilloscope
- Why switching converters are efficient

This project marks the beginning of:

- Power electronics
- Motor drives
- Buck converters
- Boost converters
- DC-DC converters
- Inverters

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain MOSFET operation

✅ Identify Gate, Drain and Source

✅ Use a MOSFET as a switch

✅ Drive a MOSFET from a microcontroller

✅ Measure PWM on the MOSFET gate

✅ Explain switching losses

✅ Understand the foundation of power electronics

---

## Theory

### What is a MOSFET?

MOSFET stands for:

**Metal Oxide Semiconductor Field Effect Transistor**

A MOSFET behaves like an electronic switch controlled by voltage rather than by hand.

```text
Small Control Signal  →  Large Power Control
```

---

## Why MOSFETs Are Important

A microcontroller pin can safely supply only a small current (typically 20 mA).

Many loads require far more:

- DC motors: hundreds of milliamps to several amps
- LED strips: hundreds of milliamps
- Buck converters: several amps

A MOSFET allows the microcontroller to control these loads safely.

---

## MOSFET Symbol

Simplified N-Channel MOSFET:

```text
       Drain
         │
         │
Gate ────┤
         │
         │
       Source
```

---

## MOSFET Terminals

### Gate (G)

Control terminal. Equivalent to the switch handle.

Applying voltage here turns the MOSFET ON or OFF.

---

### Drain (D)

Current enters here from the load.

---

### Source (S)

Current exits here toward GND.

---

## How an N-Channel MOSFET Works

When:

$$
V_{GS} = 0\ \text{V}
$$

the MOSFET is **OFF** — no current flows from Drain to Source.

---

When:

$$
V_{GS} > V_{TH}
$$

and the gate voltage is high enough for low $R_{DS(on)}$, the MOSFET is **ON** — current flows freely from Drain to Source.

Where:

$$
V_{GS} = V_G - V_S
$$

---

## Logic Level MOSFETs

For microcontroller projects always use a **Logic Level MOSFET**.

These turn on fully with a 3.3 V or 5 V gate signal.

Recommended:

- IRLZ44N
- IRLZ34N
- IRL540N

Avoid the IRFZ44N for beginner microcontroller projects — it requires a higher gate voltage to turn on fully.

---

## Why a MOSFET is Efficient

Power loss is:

$$
P = V \cdot I
$$

When the MOSFET is **OFF**: $I \approx 0$, therefore $P \approx 0$.

When the MOSFET is **ON**: $V_{DS} \approx 0$, therefore $P \approx 0$.

This is why switching devices are far more efficient than linear regulators.

---

## IRLZ44N Pinout

For the IRLZ44N in a TO-220 package, viewed from the front (marked side):

```text
      _________
     |         |
     |         |
     |_________|

       │ │ │

       G D S
```

Always verify with the datasheet before wiring.

---

## Simulink Simulation

Before building the circuit, build a Simulink model to predict the gate waveform and average voltage at each duty cycle.

This model is signal-only — no Simscape physical network is needed because the gate signal is a digital PWM waveform, not a passive circuit.

---

### Step 1 — Create a New Simulink Model

1. In MATLAB, go to **Home** tab → click **Simulink**.
2. Click **Blank Model**.
3. Go to **File → Save** and name the file `MOSFET_Gate_PWM`.

---

### Step 2 — Add Blocks

Open the **Library Browser** and drag the following blocks onto the canvas:

| Block | Library path | Quantity |
|-------|-------------|----------|
| Pulse Generator | Simulink → Sources | 1 |
| Scope | Simulink → Sinks | 1 |

---

### Step 3 — Configure the Pulse Generator

Double-click the **Pulse Generator** block and set:

| Parameter | Value |
|-----------|-------|
| Amplitude | `3.3` |
| Period | `0.002` |
| Pulse Width | `50` (percent) |
| Phase delay | `0` |

This produces a 0–3.3 V square wave at 500 Hz with 50% duty cycle, matching the ESP32 LEDC output.

---

### Step 4 — Wire the Model

Connect the **Pulse Generator** output to the **Scope** input.

---

### Step 5 — Simulation Settings

Go to **Modeling → Model Settings** (or press **Ctrl+E**).

Under **Solver**:

| Setting | Value |
|---------|-------|
| Stop time | `0.008` |
| Type | Variable-step |
| Solver | `ode45` |

Click **OK**.

---

### Step 6 — Run and Observe

Click **Run**. Open the Scope.

You should see a 0–3.3 V square wave at 500 Hz with equal ON and OFF times.

---

### Step 7 — Vary the Duty Cycle

Change the **Pulse Width** parameter in the Pulse Generator and re-run for each duty cycle:

| Pulse Width (%) | Duty Cycle | Expected $V_{AVG}$ |
|-----------------|------------|--------------------|
| 25 | 25% | 0.83 V |
| 50 | 50% | 1.65 V |
| 75 | 75% | 2.48 V |
| 100 | 100% | 3.30 V |

Observe how the ON time grows relative to the period as duty cycle increases.

---

### Wiring Checklist

✅ Pulse Generator output connected to Scope input

✅ Amplitude = 3.3, Period = 0.002, Phase delay = 0

✅ Stop time = 0.008, Variable-step, ode45

---

### Prediction Table

Record your predicted average voltages before measuring:

<div class="result-block">
<table>
  <thead><tr><th>PWM Value</th><th>Duty Cycle</th><th>Predicted V<sub>AVG</sub> (V)</th></tr></thead>
  <tbody>
    <tr><td>64</td><td>25%</td><td><input class="result-input" id="lab04-sim-vavg25" placeholder="V"></td></tr>
    <tr><td>128</td><td>50%</td><td><input class="result-input" id="lab04-sim-vavg50" placeholder="V"></td></tr>
    <tr><td>192</td><td>75%</td><td><input class="result-input" id="lab04-sim-vavg75" placeholder="V"></td></tr>
    <tr><td>255</td><td>100%</td><td><input class="result-input" id="lab04-sim-vavg100" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Components Required

- IRLZ44N MOSFET
- ESP32 DevKit V1
- LED
- 220 Ω resistor (for LED)
- 220 Ω resistor (for gate)
- Breadboard
- Jumper wires

Equipment:

- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Project Circuit

The MOSFET is used as an electronic switch to control an LED.

The microcontroller drives the MOSFET gate. The MOSFET switches the LED current.

---

## Circuit Diagram

```text
ESP32 3.3V
 │
220 Ω  (LED current-limiting resistor)
 │
LED anode (long leg)
LED cathode (short leg)
 │
Drain  (MOSFET)
Source (MOSFET) ──── GND

Gate (MOSFET)
 │
220 Ω  (gate resistor)
 │
ESP32 GPIO18
```

---

## Why a Gate Resistor?

A small resistor (220 Ω) in series with the gate limits the current spike when the gate capacitance charges.

This reduces ringing on the gate signal and protects the microcontroller pin.

---

## Experiment 1 - MOSFET as an Electronic Switch

### Objective

Switch an LED ON and OFF using a MOSFET controlled by the ESP32, and measure the gate voltage on the oscilloscope.

---

### Step-by-Step Wiring

Before inserting components, verify the MOSFET orientation using the pinout diagram above. The three legs must be identified correctly or the circuit will not work.

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 2   │ [●]   [ ]   [┐]   [ ]   [ ]       │ ← 3.3V → a2, LED res top c2  (same row)
 3   │ [ ]   [ ]   [│]   [ ]   [ ]       │  220Ω LED resistor
 4   │ [●]   [┐]   [│]   [ ]   [ ]       │ ← GPIO18 → a4, Gate res top b4  (same row)
 5   │ [ ]   [│]   [┘]   [ ]   [▲]       │ ← LED res bottom c5 = LED anode e5  (same row)
 6   │ [ ]   [│]   [ ]   [ ]   [│]       │  220Ω gate res (b4–b7), LED body (e5–e8)
 7   │ [ ]   [┘]   [ ]   [●]   [│]       │ ← Gate res bottom b7 = MOSFET Gate d7  (same row)
 8   │ [ ]   [ ]   [ ]   [●]   [▼]       │ ← MOSFET Drain d8 = LED cathode e8  (same row)
 9   │ [●]   [ ]   [ ]   [●]   [ ]       │ ← GND → a9 = MOSFET Source d9  (same row)
     └─────────────────────────────────────┘
```

Row connections (all holes in the same row are internally linked):
- Row 2: `a2` (3.3V wire) and `c2` (LED res top) — LED current path starts
- Row 4: `a4` (GPIO18 wire) and `b4` (gate res top) — control path starts
- Row 5: `c5` (LED res bottom) and `e5` (LED anode) — no jumper wire needed
- Row 7: `b7` (gate res bottom) and `d7` (MOSFET Gate) — no jumper wire needed
- Row 8: `d8` (MOSFET Drain) and `e8` (LED cathode) — no jumper wire needed
- Row 9: `a9` (GND wire) and `d9` (MOSFET Source) — Source grounded

---

### Step-by-Step Wiring

1. Insert the **IRLZ44N** into the breadboard: **Gate** at **row 7, column d**, **Drain** at **row 8, column d**, **Source** at **row 9, column d**. The three legs are consecutive — verify the G-D-S order from the pinout before inserting.
2. Connect a jumper wire from **ESP32 GND** to **row 9, column a** (same row as MOSFET Source).
3. Insert the **220 Ω LED resistor** vertically: one leg in **row 2, column c**, other in **row 5, column c**.
4. Connect a jumper wire from **ESP32 3.3V** to **row 2, column a** (same row as LED resistor top).
5. Insert the **LED**: **long leg (anode)** in **row 5, column e** (same row as LED resistor bottom), **short leg (cathode)** in **row 8, column e** (same row as MOSFET Drain).
6. Insert the **220 Ω gate resistor** vertically: one leg in **row 4, column b**, other in **row 7, column b** (same row as MOSFET Gate).
7. Connect a jumper wire from **ESP32 GPIO18** to **row 4, column a** (same row as gate resistor top).

Current path when MOSFET is ON:

```text
3.3V (a2) → LED res (c2–c5) → LED (e5–e8) → Drain (d8) → Source (d9) → GND (a9)
```

Control path:

```text
GPIO18 (a4) → Gate res (b4–b7) → Gate (d7)
```

---

### Wiring Checklist

Before uploading:

✅ MOSFET Gate at row 7, Drain at row 8, Source at row 9 (column d) — verify G-D-S order

✅ MOSFET Source (row 9, col d) in same row as GND wire (row 9, col a)

✅ LED cathode (short leg, row 8, col e) in same row as MOSFET Drain (row 8, col d)

✅ LED anode (long leg, row 5, col e) in same row as LED resistor bottom (row 5, col c)

✅ 3.3V wire at row 2, col a — same row as LED resistor top (row 2, col c)

✅ GPIO18 wire at row 4, col a — same row as gate resistor top (row 4, col b)

✅ Gate resistor bottom (row 7, col b) in same row as MOSFET Gate (row 7, col d)

---

### ESP32 Code

```cpp
void setup()
{
    // Configure GPIO18 as a digital output.
    // Note: ESP32 outputs 3.3 V HIGH, which is sufficient for the IRLZ44N.
    pinMode(18, OUTPUT);
}

void loop()
{
    // Drive gate HIGH → MOSFET turns ON → current flows → LED ON.
    digitalWrite(18, HIGH);
    delay(1000);              // Hold ON for 1 second

    // Drive gate LOW → MOSFET turns OFF → no current → LED OFF.
    digitalWrite(18, LOW);
    delay(1000);              // Hold OFF for 1 second
}
```

> **Arduino Uno:** replace GPIO18 with pin 9 and use `pinMode(9, OUTPUT)` / `digitalWrite(9, ...)`.

---

### Oscilloscope Settings — Gate Voltage

1. Insert the **CH1 probe BNC** into CH1 on the OWON HDS272S.
2. Hook the **CH1 probe tip** to the **MOSFET Gate** (row 7, col d).
3. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 200 ms/div | 200 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

```text
3.3V  ────────
              │
              │
0V  __________│________
```

---

### Observe

The LED should flash:

```text
ON for 1 second

OFF for 1 second
```

On the oscilloscope you should see the gate voltage switching between 0 V and approximately 3.3 V.

---

### Record Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Expected</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Gate LOW</td><td>0 V</td><td><input class="result-input" id="lab04-exp1-vlow" placeholder="V"></td></tr>
    <tr><td>Gate HIGH</td><td>~3.3 V</td><td><input class="result-input" id="lab04-exp1-vhigh" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 2 - PWM Controlled MOSFET

### Objective

Apply a PWM signal to the MOSFET gate and observe the switching waveform on the oscilloscope.

---

### Circuit

Same as Experiment 1.

---

### ESP32 Code

```cpp
void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);

    // Attach GPIO18 to channel 0.
    ledcAttachPin(18, 0);
}

void loop()
{
    // Set duty cycle to 128/255 ≈ 50%.
    // The MOSFET switches ON and OFF approximately 500 times per second.
    // The LED receives approximately 50% of the available power.
    ledcWrite(0, 128);
}
```

> **Arduino Uno:** replace `ledcWrite(0, 128)` with `analogWrite(9, 128)` on pin 9.

---

### Oscilloscope Settings — PWM Gate Signal

1. Insert the **CH1 probe BNC** into CH1 on the OWON HDS272S.
2. Hook the **CH1 probe tip** to the **MOSFET Gate** (row 7, col d).
3. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

```text
3.3V  ─────      ─────
           │    │
           │    │
0V    _____│____│_____
```

---

### Observe

The LED should appear at medium brightness (not flashing visibly — the switching is too fast for the eye to detect).

On the oscilloscope you should see the PWM square wave on the gate.

---

### Record Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Frequency</td><td><input class="result-input" id="lab04-exp2-freq" placeholder="Hz"></td></tr>
    <tr><td>Duty Cycle</td><td><input class="result-input" id="lab04-exp2-duty" placeholder="%"></td></tr>
    <tr><td>Peak Voltage</td><td><input class="result-input" id="lab04-exp2-vpeak" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 3 - LED Brightness Control

### Objective

Step through four duty cycle levels and observe the effect on LED brightness.

---

### Circuit

Same as Experiments 1 and 2.

---

### ESP32 Code

```cpp
void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    // Step through four duty cycle levels with a 2-second pause at each.

    ledcWrite(0, 64);    // ~25% duty cycle → LED dim
    delay(2000);

    ledcWrite(0, 128);   // ~50% duty cycle → LED medium brightness
    delay(2000);

    ledcWrite(0, 192);   // ~75% duty cycle → LED bright
    delay(2000);

    ledcWrite(0, 255);   // 100% duty cycle → LED fully ON
    delay(2000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin 9.

---

### Observe

Watch the LED step through brightness levels:

```text
Dim  →  Medium  →  Bright  →  Fully ON
```

For each step, also observe the gate waveform on the oscilloscope and note how the ON time changes.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>PWM Value</th><th>Duty Cycle</th><th>Observed Brightness</th></tr></thead>
  <tbody>
    <tr><td>64</td><td>25%</td><td><input class="result-input" id="lab04-exp3-b25" placeholder="e.g. Dim"></td></tr>
    <tr><td>128</td><td>50%</td><td><input class="result-input" id="lab04-exp3-b50" placeholder="e.g. Medium"></td></tr>
    <tr><td>192</td><td>75%</td><td><input class="result-input" id="lab04-exp3-b75" placeholder="e.g. Bright"></td></tr>
    <tr><td>255</td><td>100%</td><td><input class="result-input" id="lab04-exp3-b100" placeholder="e.g. Fully on"></td></tr>
  </tbody>
</table>
</div>

---

### Why PWM Works

Average voltage delivered to the load:

$$
V_{AVG} = D \cdot V_S
$$

At 50% duty cycle with a 3.3 V supply (ESP32):

$$
V_{AVG} = 0.5 \times 3.3 = 1.65\ \text{V}
$$

The LED receives less average power and therefore appears dimmer.

---

## MATLAB Comparison

Compare your measured gate waveform against the ideal simulation.

```matlab
Vs = 3.3;                    % ESP32 supply voltage
f_theory   = 500;            % LEDC PWM frequency (Hz)
f_measured = 490;            % replace with your measured frequency (Hz)
D_measured = 0.50;           % replace with your measured duty cycle (0–1)

Ts_t = 1 / f_theory;
Ts_m = 1 / f_measured;
t    = 0:1e-6:4*max(Ts_t, Ts_m);

pwm_theory   = Vs * double(mod(t, Ts_t) < 0.50 * Ts_t);
pwm_measured = Vs * double(mod(t, Ts_m) < D_measured * Ts_m);

figure;
subplot(2,1,1);
plot(t*1e3, pwm_theory,   'b--', 'LineWidth', 2, 'DisplayName', ...
    sprintf('Theory  f=%.0fHz D=50%%', f_theory));
hold on;
plot(t*1e3, pwm_measured, 'r',   'LineWidth', 2, 'DisplayName', ...
    sprintf('Measured f=%.0fHz D=%.0f%%', f_measured, D_measured*100));
grid on; legend; ylabel('Gate Voltage (V)');
title('Gate Waveform - Theory vs Measurement');

subplot(2,1,2);
D_vals = [0.25, 0.50, 0.75, 1.00];
Vavg_theory   = Vs .* D_vals;
Vavg_measured = Vs .* D_measured;
bar(D_vals*100, Vavg_theory, 0.4, 'b', 'DisplayName', 'Theory'); hold on;
scatter(D_measured*100, Vavg_measured, 100, 'r', 'filled', ...
    'DisplayName', 'Measured');
grid on; xlabel('Duty Cycle (%)'); ylabel('V_{AVG} (V)');
title('Average Voltage - Theory vs Measurement');
legend('Location','northwest');
```

### Reflection

- Does your measured frequency match 500 Hz?
- Does your measured $V_{AVG}$ match the theoretical value $D \times V_S$?
- Why might the measured average voltage differ slightly from theory?

---

## MATLAB PWM Harmonic Analysis

A PWM signal is not a pure sinusoid. It contains the fundamental frequency plus a series of harmonics at integer multiples of $f_0$. This script computes and plots the spectrum using both FFT and the exact Fourier series formula.

```matlab
f0  = 500;              % fundamental PWM frequency (Hz)
Vs  = 3.3;              % ESP32 gate voltage (V)
fs  = f0 * 500;         % 500 samples per cycle

D_vals = [0.25, 0.50, 0.75];

figure;
for k = 1:3
    D = D_vals(k);

    % --- FFT of simulated waveform ---
    N = 20 * round(fs / f0);                    % 20 complete cycles — must be integer
    t = (0:N-1) / fs;
    pwm = Vs * double(mod(t, 1/f0) < D/f0);

    Y = fft(pwm) / N;
    P = 2 * abs(Y);
    P(1) = abs(Y(1));                           % DC term not doubled

    harm_bins = round((0:10) * f0 * N / fs) + 1;  % bin index for each harmonic
    fft_amps  = P(harm_bins);

    % --- Analytical Fourier series (exact) ---
    %   DC:         Vs * D
    %   nth harmonic: |(2*Vs / (n*pi)) * sin(n*pi*D)|
    n = 1:10;
    anal_amps = [Vs*D, abs((2*Vs ./ (n*pi)) .* sin(n*pi*D))];

    % --- Plot ---
    subplot(3, 1, k);
    b = bar(0:10, [fft_amps; anal_amps]', 'grouped');
    b(1).FaceColor = [0.2 0.5 0.8];  b(1).DisplayName = 'FFT';
    b(2).FaceColor = [0.9 0.3 0.2];  b(2).DisplayName = 'Fourier series (exact)';
    xlabel('Harmonic  (0 = DC,  1 = f_0,  2 = 2f_0, ...)');
    ylabel('Amplitude (V)');
    title(sprintf('D = %d%%   DC = %.2f V   Fundamental = %.2f V', ...
                   D*100, Vs*D, anal_amps(2)));
    legend('Location', 'northeast');
    grid on;  xticks(0:10);  xlim([-0.5, 10.5]);
end
sgtitle(sprintf('PWM Harmonic Spectrum  |  f_0 = %d Hz,  V_S = %.1f V', f0, Vs));
```

### Key observations

- **D = 50%:** only odd harmonics exist ($f_0$, $3f_0$, $5f_0$, ...). Even harmonics cancel because the pulse is symmetric.
- **D = 25% and 75%:** even harmonics appear. Note how 25% and 75% are mirror images.
- **Amplitude decreases** with harmonic number but never reaches zero — a square wave always has infinite harmonic content.
- **DC component** ($V_{AVG} = V_S \cdot D$) is the only part doing useful work at the load. All harmonics cause heating, EMI, and noise.
- **This is why LC filters are essential** in Buck and Boost converters — to block the switching harmonics and deliver clean DC to the load.

---

## Troubleshooting

### LED Never Turns ON

Check:

✅ MOSFET pinout (Gate, Drain, Source in correct rows)

✅ LED polarity (cathode to Drain, anode toward ESP32 3.3V)

✅ Gate resistor connected between GPIO18 and Gate

✅ Source connected to GND

---

### MOSFET Gets Hot

Check:

✅ Correct MOSFET type (IRLZ44N, not IRFZ44N)

✅ Source connected to GND (not floating)

✅ Load current within MOSFET rating

---

### No PWM Visible on Oscilloscope

Check:

✅ Probe tip on MOSFET Gate

✅ Probe ground on ESP32 GND (same as MOSFET Source)

✅ Trigger type set to Edge, Rising

✅ Horizontal scale appropriate (500 µs/div for 500 Hz)

---

### Troubleshooting Checklist

✅ MOSFET orientation correct (G, D, S identified)

✅ Shared GND between controller and MOSFET Source

✅ Gate resistor in series between GPIO18 and Gate

✅ LED resistor in series between ESP32 3.3V and LED anode

✅ Probe on Gate, probe ground on GND

✅ Correct trigger settings

---

## Laboratory Exercises

### Exercise 1

Replace the LED with a small DC motor (if available). Observe the gate waveform and note any difference compared to the resistive LED load.

> Note: Add a flyback diode (e.g. 1N4007) across the motor terminals (cathode toward 5V) to protect the MOSFET from inductive voltage spikes.

---

### Exercise 2

Connect a potentiometer to GPIO34 and use its reading to control the MOSFET duty cycle in real time. Observe the gate waveform change on the oscilloscope as you turn the knob.

---

### Exercise 3

Measure the gate waveform at 25%, 50%, and 75% duty cycle. Record the ON time and OFF time for each and verify that $D = T_{ON} / T$.

---

## Knowledge Check

### Question 1

What does MOSFET stand for?

---

### Question 2

What are the three MOSFET terminals?

---

### Question 3

What controls whether the MOSFET is ON or OFF?

---

### Question 4

Why are MOSFETs used in power electronics instead of linear transistors?

---

### Question 5

Why can't a microcontroller pin drive a large motor directly?

---

### Question 6

Your simulation predicted $V_{AVG}$ = 2.5 V at 50% duty cycle but you measured 2.3 V. Give two physical reasons that could explain this.

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab04">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab04">✕ Clear All Results</button>
</div>

---

## Project Summary

In this project you learned:

✅ MOSFET operation

✅ Gate, Drain and Source

✅ Electronic switching

✅ PWM-controlled switching

✅ MOSFET efficiency

✅ How a microcontroller controls larger loads

✅ Foundations of power electronics

These ideas are the building blocks for:

- Motor controllers
- Buck converters
- Boost converters
- Inverters
- Switching power supplies

---

## Next Project

```text
05_DC_Chopper_Converters.md
```

Topics:

- DC Motor Fundamentals
- Open-Loop Speed Control
- PWM Motor Drives
- Motor Time Constants
- First-Order Motor Models
- Measuring Motor Response with the Oscilloscope
