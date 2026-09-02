# Project 03 - RLC Circuits, Resonance and Second-Order Systems

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md

---

## Objective

In this project you will learn:

- How inductors work
- How energy moves between inductors and capacitors
- What resonance is
- What ringing is
- What natural frequency is
- What damping is
- How second-order systems behave
- How to measure oscillations using the OWON HDS272S oscilloscope

This project marks the transition from first-order systems to second-order systems.

These concepts are fundamental to:

- Control theory
- PID controllers
- Motor control
- Buck converters
- Boost converters
- Inverters
- Filter design

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain resonance

✅ Explain natural frequency

✅ Explain damping

✅ Observe ringing

✅ Estimate resonant frequency

✅ Understand second-order systems

✅ Compare theory, simulation and measurements

---

## Theory

### What is an Inductor?

An inductor stores energy in a magnetic field.

Symbol:

```text
----LLLL----
```

Unlike a capacitor which resists changes in voltage, an inductor resists changes in current.

---

## Inductor Voltage Equation

The voltage across an inductor is:

$$
V_L = L \frac{di}{dt}
$$

Where:

- $V_L$ = Inductor Voltage
- $L$ = Inductance (H)
- $\frac{di}{dt}$ = Rate of change of current

---

## Inductor Energy

The energy stored in an inductor is:

$$
E = \frac{1}{2}LI^2
$$

Where:

- $E$ = Energy (J)
- $L$ = Inductance (H)
- $I$ = Current (A)

---

## The RLC Circuit

An RLC circuit contains a resistor, inductor, and capacitor.

```text
V_in
 │
 R
 │
 L
 │
 ├──── Vc ──── CH1 probe tip
 │
 C
 │
GND ──── CH1 probe ground
```

---

## What Makes RLC Circuits Different?

In Project 02 the capacitor was the only energy storage element.

Now we have two:

- Capacitor stores energy electrically
- Inductor stores energy magnetically

Energy can move back and forth between them, causing oscillation.

---

## Mechanical Analogy

An RLC circuit behaves similarly to a mass-spring-damper system:

| Mechanical System | Electrical System |
|-------------------|-------------------|
| Mass | Inductor |
| Spring | Capacitor |
| Damper | Resistor |

This analogy appears frequently in control engineering.

---

## Second-Order Systems

An RC circuit is **First Order** because it has one energy storage element.

An RLC circuit is **Second Order** because it has two energy storage elements: the capacitor and the inductor.

---

## Natural Frequency

The most important property of an RLC circuit is its natural frequency:

$$
\omega_n = \frac{1}{\sqrt{LC}}
$$

Where:

- $\omega_n$ = Natural Frequency (rad/s)
- $L$ = Inductance (H)
- $C$ = Capacitance (F)

---

## Converting to Hertz

$$
f_n = \frac{\omega_n}{2\pi}
$$

---

## Example Calculation

Given:

$$
L = 100\ \text{mH} = 0.1\ \text{H}, \quad C = 100\ \text{nF} = 100 \times 10^{-9}\ \text{F}
$$

$$
\omega_n = \frac{1}{\sqrt{0.1 \times 100 \times 10^{-9}}} \approx 10\,000\ \text{rad/s}
$$

$$
f_n = \frac{10\,000}{2\pi} \approx 1591\ \text{Hz}
$$

---

## Damping

The resistor removes energy from the system. This process is called **damping**.

More resistance → more damping → oscillation dies away faster.

Less resistance → less damping → oscillation persists longer.

---

## Damping Ratio

$$
\zeta = \frac{R}{2}\sqrt{\frac{C}{L}}
$$

Where $\zeta$ = Damping Ratio.

---

## RLC Circuit Differential Equation

Applying Kirchhoff's Voltage Law around the series RLC loop:

$$
V_S = V_R + V_L + V_C = iR + L\frac{di}{dt} + V_C
$$

Since $i = C\dfrac{dV_C}{dt}$:

$$
LC\frac{d^2V_C}{dt^2} + RC\frac{dV_C}{dt} + V_C = V_S
$$

This is a **second-order linear ODE** — two energy storage elements produce a second derivative.

---

## Laplace Domain Solution

Taking the Laplace transform (zero initial conditions):

$$
LCs^2 V_C(s) + RCs\, V_C(s) + V_C(s) = V_S(s)
$$

The **transfer function** is:

$$
\boxed{H(s) = \frac{V_C(s)}{V_S(s)} = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}}
$$

Where:

$$
\omega_n = \frac{1}{\sqrt{LC}} \qquad \zeta = \frac{R}{2}\sqrt{\frac{C}{L}}
$$

The poles of $H(s)$ are:

$$
s_{1,2} = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}
$$

- $\zeta < 1$: complex conjugate poles → underdamped (oscillatory)
- $\zeta = 1$: repeated real pole → critically damped
- $\zeta > 1$: two distinct real poles → overdamped

---

## Underdamped Step Response — Time Domain

For $\zeta < 1$ the step response is:

$$
V_C(t) = V_S\left[1 - \frac{e^{-\zeta\omega_n t}}{\sqrt{1-\zeta^2}}\sin\!\left(\omega_d t + \phi\right)\right]
$$

Where the **damped natural frequency** is:

$$
\omega_d = \omega_n\sqrt{1 - \zeta^2}
$$

and $\phi = \arccos(\zeta)$.

The ringing you observe on the oscilloscope oscillates at $\omega_d$, which is slightly lower than $\omega_n$ when damping is present.

---

## Types of Response

### Underdamped ($\zeta < 1$)

- Oscillation and ringing
- Overshoot

### Critically Damped ($\zeta = 1$)

- Fastest non-oscillatory response

### Overdamped ($\zeta > 1$)

- No oscillation
- Slow response

---

## Simscape Simulation

Before building the circuit, build a Simscape model to predict the step response for each resistor value.

### Model Overview

One model covers all three experiments. You change the resistor value between runs.

---

### Step 1 — Create a New Simulink Model

1. In MATLAB, go to **Home** tab → click **Simulink**.
2. Click **Blank Model**.
3. Go to **File → Save** and name the file `RLC_Step_Response`.

---

### Step 2 — Open the Library Browser

In the Simulink toolbar click **Library Browser** (book icon).

You will use blocks from two libraries:

- **Simscape → Foundation Library → Electrical → Electrical Sources**
- **Simscape → Foundation Library → Electrical → Electrical Elements**
- **Simscape → Foundation Library → Electrical → Electrical Sensors**
- **Simscape → Utilities**
- **Simulink → Sources**
- **Simulink → Sinks**

---

### Step 3 — Add Blocks

Drag the following blocks onto the canvas:

| Block | Library path | Quantity |
|-------|-------------|----------|
| Pulse Generator | Simulink → Sources | 1 |
| Controlled Voltage Source | Simscape → Foundation Library → Electrical → Electrical Sources | 1 |
| Resistor | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Inductor | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Capacitor | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Voltage Sensor | Simscape → Foundation Library → Electrical → Electrical Sensors | 1 |
| Electrical Reference | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Simulink-PS Converter | Simscape → Utilities | 1 |
| PS-Simulink Converter | Simscape → Utilities | 1 |
| Scope | Simulink → Sinks | 1 |
| Solver Configuration | Simscape → Utilities | 1 |

---

### Step 4 — Configure the Pulse Generator

Double-click the **Pulse Generator** block and set:

| Parameter | Value |
|-----------|-------|
| Amplitude | `1` |
| Period | `0.006` |
| Pulse Width | `50` (percent) |
| Phase delay | `0` |

This produces a 0–1 V square wave at ~167 Hz with a 3 ms ON time — long enough for the ringing to fully settle before the next transition.

---

### Step 5 — Configure the Resistor

Double-click the **Resistor** block and set:

| Parameter | Value |
|-----------|-------|
| Resistance | `100` |

You will change this value to 47 and 470 for Experiments 3 and 4.

---

### Step 6 — Configure the Inductor

Double-click the **Inductor** block and set:

| Parameter | Value |
|-----------|-------|
| Inductance | `0.1` |

---

### Step 7 — Configure the Capacitor

Double-click the **Capacitor** block and set:

| Parameter | Value |
|-----------|-------|
| Capacitance | `100e-9` |

---

### Step 8 — Wire the Circuit

Connect the blocks in this order:

```text
Pulse Generator  →  Simulink-PS Converter  →  Controlled Voltage Source (input port)

Controlled Voltage Source (+)  →  Resistor (left port)
Resistor (right port)          →  Inductor (left port)
Inductor (right port)          →  Capacitor (p port)
Capacitor (n port)             →  Electrical Reference
Controlled Voltage Source (−)  →  Electrical Reference

Capacitor (p port)  →  Voltage Sensor (+ port)
Voltage Sensor (− port)  →  Electrical Reference

Voltage Sensor (V port)  →  PS-Simulink Converter (input)
PS-Simulink Converter (output)  →  Scope
```

> The Electrical Reference block is the circuit ground. Wire the negative terminal of the Controlled Voltage Source, the negative terminal of the Voltage Sensor, and the bottom of the Capacitor all to the same Electrical Reference node.

> The Voltage Sensor measures the voltage across the Capacitor. Its `+` port connects to the junction between the Inductor and Capacitor (`p` port of Capacitor). Its `−` port connects to Electrical Reference.

---

### Step 9 — Connect the Solver Configuration

Drag the **Solver Configuration** block onto the canvas.

Connect its single port to any wire in the Simscape (physical) network — for example, to the wire between the Inductor and Capacitor.

This block is required for every Simscape model. It does not affect the signal path.

---

### Step 10 — Simulation Settings

In the Simulink toolbar go to **Modeling → Model Settings** (or press **Ctrl+E**).

Under **Solver**:

| Setting | Value |
|---------|-------|
| Stop time | `0.018` |
| Type | Variable-step |
| Solver | `ode23t` |
| Max step size | `1e-6` |

This gives three complete pulse cycles (3 × 6 ms), enough to see the ringing settle on each transition.

Click **OK**.

---

### Step 11 — Run the Simulation

Click the **Run** button (green triangle).

Double-click the **Scope** to open it.

You should see the capacitor voltage oscillate and ring after each transition, then settle. The ringing frequency should be approximately 1591 Hz.

---

### Step 12 — Repeat for Each Resistor Value

Change the **Resistor** value and re-run for each experiment:

| Experiment | R value | Expected response |
|------------|---------|------------------|
| Experiment 1 & 2 | 100 Ω | Moderate ringing, ~5–10 cycles visible |
| Experiment 3 | 470 Ω | Little or no ringing, fast decay |
| Experiment 4 | 47 Ω | Strong ringing, many cycles visible |

---

### Wiring Checklist

✅ Pulse Generator output → **Simulink-PS Converter** → Controlled Voltage Source input port

✅ Series path: Controlled Voltage Source (+) → Resistor → Inductor → Capacitor (p) → Electrical Reference

✅ Controlled Voltage Source (−) connected to Electrical Reference

✅ Voltage Sensor (+) at junction between Inductor and Capacitor (p port)

✅ Voltage Sensor (−) connected to Electrical Reference

✅ Voltage Sensor output (V) → PS-Simulink Converter → Scope

✅ Solver Configuration block connected to the physical network

✅ Stop time = 0.018, Solver = ode23t, Max step = 1e-6

---

### Prediction Table

Record your predictions before measuring:

<div class="result-block">
<table>
  <thead><tr><th>R</th><th>Predicted ζ</th><th>Expected behaviour</th></tr></thead>
  <tbody>
    <tr><td>47 Ω</td><td><input class="result-input" id="lab03-sim-zeta47" placeholder=""></td><td><input class="result-input" id="lab03-sim-beh47" placeholder="e.g. Strong ringing"></td></tr>
    <tr><td>100 Ω</td><td><input class="result-input" id="lab03-sim-zeta100" placeholder=""></td><td><input class="result-input" id="lab03-sim-beh100" placeholder="e.g. Moderate ringing"></td></tr>
    <tr><td>470 Ω</td><td><input class="result-input" id="lab03-sim-zeta470" placeholder=""></td><td><input class="result-input" id="lab03-sim-beh470" placeholder="e.g. Little ringing"></td></tr>
  </tbody>
</table>
</div>

---

## Components Required

- ESP32 DevKit V1
- Breadboard
- Jumper wires
- 100 mH inductor
- 100 nF capacitor
- 100 Ω resistor (plus 47 Ω and 470 Ω for Experiments 3 and 4)

Equipment:

- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Experiment 1 - Observe Ringing

### Objective

Observe the oscillatory (ringing) response of a second-order RLC circuit when excited by a square wave.

---

### Circuit Diagram

```text
ESP32 GPIO18
    │
   100 Ω resistor
    │
   100 mH inductor
    │
    ├──── Vc ──── CH1 probe tip
    │
   100 nF capacitor
    │
   GND ──── CH1 probe ground
```

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 4   │ [●]   [ ]   [┐]   [ ]   [ ]       │ ← GPIO18 → a4, Resistor top c4
 5   │ [ ]   [ ]   [┘]   [ ]   [┐]       │ ← R bottom c5 = L top e5  (same row = connected)
 6   │ [ ]   [ ]   [ ]   [ ]   [│]       │
 7   │ [ ]   [ ]   [ ]   [ ]   [│]       │  100 mH inductor (e5–e9)
 8   │ [ ]   [ ]   [ ]   [ ]   [│]       │
 9   │ [ ]   [ ]   [▲]   [ ]   [┘]       │ ← Vc: L bottom e9 = Cap+ c9  (same row = connected)
10   │ [ ]   [ ]   [│]   [ ]   [ ]       │  100 nF cap body (c9–c11)
11   │ [ ]   [ ]   [▼]   [ ]   [ ]       │ ← Cap− c11 → GND
     └─────────────────────────────────────┘
```

**Row 9 is the Vc junction** — L bottom (e9) and cap positive (c9) are in the same row so they are automatically connected. Connect the CH1 probe tip here.

Row connections (same row = internally linked on the breadboard):
- Row 5: `c5` (resistor bottom) and `e5` (inductor top) are connected → no jumper wire needed
- Row 9: `e9` (inductor bottom) and `c9` (cap positive) are connected → Vc junction

---

### Step-by-Step Wiring

1. Insert the **100 Ω resistor** vertically: one leg in **row 4, column c**, other in **row 5, column c**.
2. Connect a jumper wire from **ESP32 GPIO18** to **row 4, column a**.
3. Insert the **100 mH inductor** vertically: one end in **row 5, column e**, other end in **row 9, column e**. Row 5 is already connected to the resistor bottom (same row — no extra jumper needed).
4. Insert the **100 nF capacitor** vertically: **positive lead** in **row 9, column c**, **negative lead** in **row 11, column c**. Row 9 is the Vc junction (connected to the inductor bottom via the row).
5. Connect a jumper wire from **row 11, column c** (cap negative) to any **GND pin** on the ESP32.
6. Hook the **CH1 probe tip** to any hole in **row 9** (Vc junction).
7. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

The signal path is:

```text
GPIO18 → Resistor (rows 4–5) → Inductor (rows 5–9) → Vc (row 9, probe here) → Capacitor (rows 9–11) → GND
```

---

### Wiring Checklist

Before uploading:

✅ GPIO18 jumper at row 4, column a

✅ Resistor in column c, rows 4–5

✅ Inductor in column e, rows 5–9 (top leg in same row as resistor bottom)

✅ Capacitor positive lead in row 9, column c (same row as inductor bottom = Vc)

✅ Capacitor negative leg connected to GND

✅ CH1 probe tip at row 9 (Vc)

✅ CH1 probe ground at ESP32 GND

---

### ESP32 Code

```cpp
void setup()
{
    // Configure GPIO18 as a digital output.
    pinMode(18, OUTPUT);
}

void loop()
{
    // Toggle GPIO18 rapidly to produce a square wave.
    // The fast transitions excite the natural dynamics of the RLC circuit,
    // causing the capacitor voltage to ring at the natural frequency.
    digitalWrite(18, HIGH);
    delayMicroseconds(500);   // HIGH for 500 µs

    digitalWrite(18, LOW);
    delayMicroseconds(500);   // LOW for 500 µs
}
```

> **Arduino Uno:** replace GPIO18 with pin 9 and use `pinMode(9, OUTPUT)` / `digitalWrite(9, ...)` instead of LEDC.

---

### Why Use a Square Wave?

A square wave contains fast voltage transitions.

These transitions excite the natural dynamics of the RLC circuit, causing the capacitor voltage to oscillate at the natural frequency.

This allows us to observe resonance and ringing on the oscilloscope.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 1 V/div | 1 V/div |
| Horizontal scale | 100 µs/div | 100 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

Instead of a simple square wave you should observe ringing on each transition:

```text
         /\_
        /   \_
       /      \_
______/         \____
```

This oscillation is called **ringing**.

---

### Observe

Watch the oscilloscope display.

You should see the capacitor voltage oscillate rapidly after each transition, then gradually settle.

The oscillation frequency is the natural frequency of the RLC circuit.

---

## Experiment 2 - Measure Resonant Frequency

### Objective

Estimate the natural frequency from the oscilloscope and compare it to the theoretical value.

---

### Procedure

1. Zoom into the ringing waveform. Try **50 µs/div** if the oscillation is hard to see at 100 µs/div.
2. Measure the time for one complete oscillation cycle (from one peak to the next).
3. Record the measured period.
4. Calculate the frequency using $f = 1/T$.

---

### Expected Result

Theoretical natural frequency:

$$
f_n \approx 1591\ \text{Hz}
$$

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Theory</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>L</td><td>100 mH</td><td><input class="result-input" id="lab03-exp2-L" placeholder="mH"></td></tr>
    <tr><td>C</td><td>100 nF</td><td><input class="result-input" id="lab03-exp2-C" placeholder="nF"></td></tr>
    <tr><td>f<sub>n</sub></td><td>1591 Hz</td><td><input class="result-input" id="lab03-exp2-fn" placeholder="Hz"></td></tr>
    <tr><td>Ringing observed</td><td>Yes</td><td><input class="result-input" id="lab03-exp2-ring" placeholder="Yes / No"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 3 - Increase Damping

### Objective

Observe how increasing resistance increases damping and reduces ringing.

Replace the **100 Ω** resistor with a **470 Ω** resistor. All other components remain the same.

---

### Prediction

Higher resistance means:

- Higher damping ratio $\zeta$
- Less ringing
- Faster energy dissipation

---

### Observe

Describe the waveform compared to Experiment 1:

<div class="result-block">
  <textarea class="result-textarea" id="lab03-exp3-obs" placeholder="Describe what you observe compared to Experiment 1..."></textarea>
</div>

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Resistance</th><th>Ringing Observed</th></tr></thead>
  <tbody>
    <tr><td>100 Ω</td><td><input class="result-input" id="lab03-exp3-ring100" placeholder="e.g. Moderate"></td></tr>
    <tr><td>470 Ω</td><td><input class="result-input" id="lab03-exp3-ring470" placeholder="e.g. Little / None"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 4 - Reduce Damping

### Objective

Observe how reducing resistance reduces damping and increases ringing.

Replace the resistor with a **47 Ω** resistor.

---

### Prediction

Lower resistance means:

- Lower damping ratio $\zeta$
- More oscillation
- Longer ringing duration

---

### Observe

Describe the waveform compared to Experiments 1 and 3:

<div class="result-block">
  <textarea class="result-textarea" id="lab03-exp4-obs" placeholder="Describe what you observe compared to Experiments 1 and 3..."></textarea>
</div>

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Resistance</th><th>Damping</th><th>Response</th></tr></thead>
  <tbody>
    <tr><td>47 Ω</td><td>Low</td><td><input class="result-input" id="lab03-exp4-resp47" placeholder="e.g. Strong ringing"></td></tr>
    <tr><td>100 Ω</td><td>Medium</td><td><input class="result-input" id="lab03-exp4-resp100" placeholder="e.g. Moderate ringing"></td></tr>
    <tr><td>470 Ω</td><td>High</td><td><input class="result-input" id="lab03-exp4-resp470" placeholder="e.g. Overdamped"></td></tr>
  </tbody>
</table>
</div>

---

## Understanding Overshoot

An underdamped system often exceeds its final value before settling. This is called **overshoot**.

```text
Target
-------
       /\_
      /   \__
_____/       \____
```

Overshoot is extremely important in:

- PID control
- Servo systems
- Power converters

---

## MATLAB Comparison

Overlay your measured resonant frequency against the theoretical simulation.

```matlab
L = 0.1;
C = 100e-9;
R = 100;

T_measured = 630e-6;         % replace with your measured period (s)
f_measured  = 1 / T_measured;
f_theory    = 1 / (2 * pi * sqrt(L * C));

fprintf('Theory  fn = %.1f Hz\n', f_theory);
fprintf('Measured fn = %.1f Hz\n', f_measured);
fprintf('Error = %.2f%%\n', 100 * abs(f_measured - f_theory) / f_theory);

t = 0:1e-6:3e-3;

num_t = [1/C]; den_t = [L, R, 1/C];
G_theory = tf(num_t, den_t);
[y_theory, ~] = step(G_theory, t);

wn_m = 2 * pi * f_measured;
zeta = (R / 2) * sqrt(C / L);
den_m = [1, 2*zeta*wn_m, wn_m^2];
G_meas = tf([wn_m^2], den_m);
[y_meas, ~] = step(G_meas, t);

figure; hold on;
plot(t * 1e3, y_theory, 'b--', 'LineWidth', 2, 'DisplayName', ...
    sprintf('Theory  fn=%.0fHz', f_theory));
plot(t * 1e3, y_meas,   'r',   'LineWidth', 2, 'DisplayName', ...
    sprintf('Measured fn=%.0fHz', f_measured));
grid on;
xlabel('Time (ms)'); ylabel('Voltage (V)');
title('RLC Step Response - Theory vs Measurement');
legend('Location', 'northeast');
```

### Reflection

- How close is your measured $f_n$ to the theoretical value?
- Are the poles real or complex? What does that tell you about the response?
- What would happen to the poles if you increased R to 470 Ω?

---

## Troubleshooting

### No Ringing Visible

Check:

✅ Inductor and capacitor values correct

✅ Component order in series: Resistor → Inductor → Capacitor

✅ Horizontal scale appropriate (try 100 µs/div or 50 µs/div)

✅ Probe tip connected to Vc (between inductor and capacitor)

---

### Frequency Does Not Match Theory

Check:

✅ Component values (inductors and capacitors have wide tolerances)

✅ Horizontal scale calibration

---

### Waveform Unstable

Adjust:

✅ Trigger level to approximately half the signal amplitude

✅ Horizontal scale to show 2–3 complete oscillation cycles

---

### Troubleshooting Checklist

✅ Controller powered and code uploaded

✅ Probe connected to Vc

✅ Probe ground connected to GND

✅ Correct component values and order

✅ Oscilloscope triggering correctly

✅ Appropriate time scale selected

---

## Laboratory Exercises

### Exercise 1

Calculate the natural frequency for L = 100 mH and C = 47 nF. Build the circuit and verify your prediction on the oscilloscope.

---

### Exercise 2

With R = 100 Ω, L = 100 mH, C = 100 nF, calculate the damping ratio. Is the circuit underdamped, critically damped, or overdamped?

---

### Exercise 3

Find the resistor value that produces critical damping ($\zeta = 1$) for L = 100 mH and C = 100 nF. Build the circuit and observe whether ringing disappears.

---

## Knowledge Check

### Question 1

What is resonance?

---

### Question 2

What is natural frequency?

---

### Question 3

What causes ringing in an RLC circuit?

---

### Question 4

What happens to the ringing when resistance increases?

---

### Question 5

Why is an RLC circuit a second-order system?

---

### Question 6

Your MATLAB simulation predicted $f_n$ = 1591 Hz but you measured $f_n$ = 1520 Hz. Name two physical reasons that could explain this discrepancy.

---

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab03">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab03">✕ Clear All Results</button>
</div>

## Project Summary

In this project you learned:

✅ Inductor behaviour

✅ Energy storage in magnetic fields

✅ Resonance

✅ Ringing

✅ Natural frequency

✅ Damping

✅ Overshoot

✅ Second-order systems

✅ Oscilloscope measurements of oscillatory systems

✅ MATLAB simulation of dynamic behaviour

These concepts form the foundation of:

- Transfer functions
- Pole-zero analysis
- Control theory
- PID tuning
- Buck converters
- Boost converters
- Inverters

---

## Next Project

```text
04_MOSFET_Fundamentals.md
```

Topics:

- MOSFET operation
- Switching
- Gate control
- Power electronics
- PWM switching stages
- Foundations of DC-DC converters
