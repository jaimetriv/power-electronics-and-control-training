# Project 02 - RC Circuits and Time Constants

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md

---

## Objective

In this project you will learn:

- How capacitors work
- How capacitors charge and discharge
- What a time constant is
- How to calculate a time constant
- How to measure a time constant using the OWON HDS272S oscilloscope
- What a first-order system is
- How theory compares with real measurements

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain how a capacitor works

✅ Explain capacitor charging

✅ Explain capacitor discharging

✅ Calculate a time constant

✅ Measure a time constant

✅ Understand exponential responses

✅ Understand first-order systems

✅ Compare theory against measurements

---

## Theory

### What is a Capacitor?

A capacitor stores energy in an electric field.

Capacitor symbol:

```text
      ||
------||------
      ||
```

Unlike a resistor which dissipates energy, a capacitor stores energy and releases it later.

---

## Capacitor Energy

$$
E = \frac{1}{2}CV^2
$$

---

## The RC Circuit

```text
V_S
 │
 R
 │
 ├──── Vc ──── Probe Tip
 │
 C
 │
GND ──── Probe GND
```

---

## Capacitor Charging

$$
V_C(t) = V_F\left(1 - e^{-t/\tau}\right)
$$

---

## Capacitor Discharging

$$
V_C(t) = V_0 \, e^{-t/\tau}
$$

---

## Time Constant

$$
\tau = RC
$$

After one time constant ($t = \tau$) the capacitor reaches **63.2%** of its final value during charging.

---

## RC Circuit Differential Equation

Applying Kirchhoff's Voltage Law around the series RC loop:

$$
V_S = V_R + V_C = iR + V_C
$$

Since $i = C\dfrac{dV_C}{dt}$:

$$
RC\frac{dV_C}{dt} + V_C = V_S
$$

This is a **first-order linear ODE** with time constant $\tau = RC$.

---

## Laplace Domain Solution

Taking the Laplace transform (with zero initial conditions):

$$
RC \cdot s \cdot V_C(s) + V_C(s) = V_S(s)
$$

$$
V_C(s)\left(RCs + 1\right) = V_S(s)
$$

The **transfer function** of the RC low-pass filter is therefore:

$$
\boxed{H(s) = \frac{V_C(s)}{V_S(s)} = \frac{1}{\tau s + 1} = \frac{1}{RCs + 1}}
$$

This is a **first-order system** with a single pole at $s = -1/\tau$.

---

## Step Response — Time Domain Solution

For a step input $V_S(s) = V_F/s$:

$$
V_C(s) = \frac{V_F}{s} \cdot \frac{1}{\tau s + 1} = V_F\left(\frac{1}{s} - \frac{\tau}{\tau s + 1}\right)
$$

Inverting back to the time domain:

$$
\boxed{V_C(t) = V_F\left(1 - e^{-t/\tau}\right)}
$$

For discharging from initial voltage $V_0$ with $V_S = 0$:

$$
\boxed{V_C(t) = V_0\, e^{-t/\tau}}
$$

---

## Frequency Domain — Low-Pass Filter

Substituting $s = j\omega$ into the transfer function:

$$
H(j\omega) = \frac{1}{j\omega RC + 1}
$$

The magnitude (gain) is:

$$
|H(j\omega)| = \frac{1}{\sqrt{1 + (\omega RC)^2}} = \frac{1}{\sqrt{1 + (\omega/\omega_c)^2}}
$$

Where the **cutoff frequency** is:

$$
\omega_c = \frac{1}{RC} = \frac{1}{\tau} \qquad \Longrightarrow \qquad f_c = \frac{1}{2\pi RC}
$$

At $\omega = \omega_c$ the gain equals $1/\sqrt{2} \approx 0.707$ — this is the **−3 dB point**.

---

## Charging Table

| Time | Charge Level |
|------|--------------|
| 1τ | 63.2% |
| 2τ | 86.5% |
| 3τ | 95.0% |
| 4τ | 98.2% |
| 5τ | 99.3% |

---

## Simulink/Simscape Simulation

Build these two models before the hardware experiments. The first predicts the charging and discharging waveforms for Experiments 1–4. The second predicts the filter frequency response for Experiments 5–6.

---

## Model 1 — RC Charging and Discharging (Experiments 1–4)

### Model Overview

A Simscape Electrical RC circuit driven by a pulsing voltage source. A Voltage Sensor measures $V_C$ and feeds a Scope.

---

### Components Required

| Component | Library Path | Quantity |
|---|---|---|
| Controlled Voltage Source | Simscape > Electrical > Sources | 1 |
| Resistor | Simscape > Electrical > Passives | 1 |
| Capacitor | Simscape > Electrical > Passives | 1 |
| Voltage Sensor | Simscape > Electrical > Sensors & Transducers | 1 |
| Electrical Reference | Simscape > Electrical > Utilities | 1 |
| Solver Configuration | Simscape > Utilities | 1 |
| Pulse Generator | Simulink > Sources | 1 |
| Simulink-PS Converter | Simscape > Utilities | 1 |
| PS-Simulink Converter | Simscape > Utilities | 1 |
| Scope | Simulink > Sinks | 1 |

---

### Build Instructions

**1. Create a new Simulink model**

In MATLAB: Home > New > Simulink Model. Save as `RC_Circuits.slx`.

---

**2. Add and configure the Pulse Generator**

- Drag a **Pulse Generator** block onto the canvas.
- Double-click and set:
  - Amplitude: `3.3`
  - Period: `6` s
  - Pulse Width: `50` % (3 s HIGH, 3 s LOW)
  - Phase delay: `0`
- This replicates the ESP32 GPIO toggling every 3 s.

---

**3. Add the Controlled Voltage Source**

- Drag a **Controlled Voltage Source** onto the canvas.
- Drag a **Simulink-PS Converter** (Simscape > Utilities) onto the canvas.
- Connect the **Pulse Generator** output → **Simulink-PS Converter** input.
- Connect the **Simulink-PS Converter** output → **Controlled Voltage Source** input port.
- The `+` terminal faces upward (top of circuit).

> The Controlled Voltage Source input port expects a **physical signal (PS)**, not a standard Simulink signal. The Simulink-PS Converter bridges the two domains. Without it the model will produce a data-type error on simulation.

---

**4. Add the Resistor**

- Drag a **Resistor** onto the canvas.
- Double-click and set Resistance: `10000` Ω.
- Connect the `+` terminal of the Voltage Source to one terminal of the Resistor.

---

**5. Add the Capacitor**

- Drag a **Capacitor** onto the canvas.
- Double-click and set:
  - Capacitance: `100e-6` F
  - Initial voltage: `0` V
- Connect the free terminal of the Resistor to the `+` terminal of the Capacitor.
- This junction is $V_C$.

---

**6. Add Electrical References**

- Drag two **Electrical Reference** blocks onto the canvas.
- Connect one to the `−` terminal of the Voltage Source.
- Connect the other to the `−` terminal of the Capacitor.
- These define the circuit ground.

---

**7. Add the Voltage Sensor**

- Drag a **Voltage Sensor** onto the canvas.
- Connect its `+` terminal to the $V_C$ node (junction between Resistor and Capacitor `+`).
- Connect its `−` terminal to an Electrical Reference (ground).

---

**8. Add the PS-Simulink Converter**

- Drag a **PS-Simulink Converter** onto the canvas.
- Connect the output port of the Voltage Sensor to the input of the PS-Simulink Converter.
- This converts the Simscape physical signal to a Simulink signal for the Scope.

---

**9. Add the Scope**

- Drag a **Scope** onto the canvas.
- Connect the output of the PS-Simulink Converter to the Scope input.

---

**10. Add the Solver Configuration**

- Drag a **Solver Configuration** block onto the canvas.
- Connect it to any Simscape node (e.g. the $V_C$ node).
- This block is required for every Simscape model.

---

### Wiring Checklist

✅ Pulse Generator output → **Simulink-PS Converter** → Controlled Voltage Source input port

✅ Voltage Source `+` → Resistor → Capacitor `+` (series chain)

✅ Voltage Source `−` → Electrical Reference

✅ Capacitor `−` → Electrical Reference

✅ Voltage Sensor `+` at $V_C$ node, `−` at Electrical Reference

✅ PS-Simulink Converter between Voltage Sensor output and Scope

✅ Solver Configuration connected to the Simscape network

---

### Simulation Settings

Open **Model Settings** (Ctrl+E) and set:

| Setting | Value |
|---|---|
| Stop time | `12` s (two full charge/discharge cycles) |
| Solver | `ode23t` |
| Max step size | `0.01` |

---

### Run and Observe

Click **Run** (Ctrl+T). Open the Scope.

Expected waveform:

- $V_C$ rises from 0 V toward 3.3 V exponentially during each HIGH phase
- $V_C$ falls back toward 0 V exponentially during each LOW phase
- At exactly 1 s into each charging phase: $V_C \approx 2.09$ V (63.2% of 3.3 V)
- At exactly 1 s into each discharging phase: $V_C \approx 1.21$ V (36.8% of 3.3 V)

---

### Vary Component Values

To predict Experiments 3 and 4, change the Resistor and Capacitor values in the model:

| Experiment | R | C | Expected τ | Stop time | Max step size |
|---|---|---|---|---|---|
| 1 & 2 | 10 kΩ | 100 µF | 1.0 s | `12` s | `0.01` |
| 3 | 10 kΩ | 10 µF | 0.1 s | `1.2` s | `0.001` |
| 4 | 1 kΩ | 100 µF | 0.1 s | `1.2` s | `0.001` |

---

### Prediction Table

<div class="result-block">
<table>
  <thead><tr><th>R</th><th>C</th><th>Predicted τ</th><th>V<sub>C</sub> at 1τ (V)</th></tr></thead>
  <tbody>
    <tr><td>10 kΩ</td><td>100 µF</td><td><input class="result-input" id="lab02-sim1-tau1" placeholder="s"></td><td><input class="result-input" id="lab02-sim1-vc1" placeholder="V"></td></tr>
    <tr><td>10 kΩ</td><td>10 µF</td><td><input class="result-input" id="lab02-sim1-tau2" placeholder="s"></td><td><input class="result-input" id="lab02-sim1-vc2" placeholder="V"></td></tr>
    <tr><td>1 kΩ</td><td>100 µF</td><td><input class="result-input" id="lab02-sim1-tau3" placeholder="s"></td><td><input class="result-input" id="lab02-sim1-vc3" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Model 2 — RC Filter Frequency Response (Experiments 5–6)

### Model Overview

A Simscape Electrical RC circuit driven by a sine wave source. Two Voltage Sensors measure $V_{IN}$ and $V_{OUT}$ simultaneously, feeding a two-channel Scope. Running the simulation at multiple frequencies maps out the filter response.

---

### Components Required

| Component | Library Path | Quantity |
|---|---|---|
| Controlled Voltage Source | Simscape > Electrical > Sources | 1 |
| Resistor | Simscape > Electrical > Passives | 1 |
| Capacitor | Simscape > Electrical > Passives | 1 |
| Voltage Sensor | Simscape > Electrical > Sensors & Transducers | 2 |
| Electrical Reference | Simscape > Electrical > Utilities | 1 |
| Solver Configuration | Simscape > Utilities | 1 |
| Sine Wave | Simulink > Sources | 1 |
| Simulink-PS Converter | Simscape > Utilities | 1 |
| PS-Simulink Converter | Simscape > Utilities | 2 |
| Scope | Simulink > Sinks | 1 |

---

### Build Instructions

**1. Reuse `RC_Circuits.slx` or create a new model**

Add a second subsystem or save a copy as `RC_Filter.slx`.

---

**2. Add and configure the Sine Wave block**

- Drag a **Sine Wave** block onto the canvas.
- Double-click and set:
  - Amplitude: `1`
  - Frequency: `2*pi*159` rad/s (= 159 Hz, the cutoff frequency)
  - Phase: `0`
  - Sample time: `0`
- Drag a **Simulink-PS Converter** (Simscape > Utilities) onto the canvas.
- Connect the **Sine Wave** output → **Simulink-PS Converter** input.
- Connect the **Simulink-PS Converter** output → **Controlled Voltage Source** input port.

> The same domain-bridging rule applies here: the Sine Wave is a Simulink signal and the Controlled Voltage Source expects a physical signal.

---

**3. Build the low-pass RC circuit**

- Add a **Resistor** (10 000 Ω) and a **Capacitor** (100e-9 F).
- Connect: Voltage Source `+` → Resistor → Capacitor `+` → Electrical Reference.
- The junction between Resistor and Capacitor is $V_{OUT}$.
- Connect Voltage Source `−` to Electrical Reference.

---

**4. Add Voltage Sensors for $V_{IN}$ and $V_{OUT}$**

- Place **Voltage Sensor 1** across the Voltage Source (`+` at source `+` terminal, `−` at ground). This measures $V_{IN}$.
- Place **Voltage Sensor 2** across the Capacitor (`+` at $V_{OUT}$ node, `−` at ground). This measures $V_{OUT}$.

---

**5. Add two PS-Simulink Converters and a two-channel Scope**

- Connect Voltage Sensor 1 output → PS-Simulink Converter 1 → Scope channel 1.
- Connect Voltage Sensor 2 output → PS-Simulink Converter 2 → Scope channel 2.
- Double-click the Scope, go to **File > Number of Input Ports** and set to `2`.
- Label channel 1 `VIN` and channel 2 `VOUT`.

---

**6. Add Solver Configuration**

- Connect a **Solver Configuration** block to any Simscape node.

---

### Wiring Checklist

✅ Sine Wave → **Simulink-PS Converter** → Controlled Voltage Source input port

✅ Voltage Source `+` → Resistor → Capacitor `+` → Electrical Reference (LP circuit)

✅ Voltage Sensor 1 across Voltage Source (measures $V_{IN}$)

✅ Voltage Sensor 2 across Capacitor (measures $V_{OUT}$)

✅ Two PS-Simulink Converters feeding a two-channel Scope

✅ Solver Configuration connected to the network

---

### Simulation Settings

| Setting | Value |
|---|---|
| Stop time | `0.1` s (covers several cycles at 159 Hz) |
| Solver | `ode23t` |
| Max step size | `1e-5` |

---

### Run at Multiple Frequencies

Change the Sine Wave **Frequency** parameter for each row of the measurement table and re-run. Read the peak amplitude of each channel from the Scope.

| Frequency (Hz) | Sine Wave Frequency (rad/s) | Expected $V_{OUT}/V_{IN}$ |
|---|---|---|
| 10 | `2*pi*10` | ≈ 1.00 |
| 100 | `2*pi*100` | ≈ 0.85 |
| 159 | `2*pi*159` | ≈ 0.707 |
| 500 | `2*pi*500` | ≈ 0.30 |
| 1000 | `2*pi*1000` | ≈ 0.16 |
| 10000 | `2*pi*10000` | ≈ 0.016 |

---

### Simulate the High-Pass Filter

To simulate Experiment 6, swap the Resistor and Capacitor positions in the model:

- Voltage Source `+` → Capacitor → Resistor `+` → Electrical Reference
- Move Voltage Sensor 2 to measure across the Resistor instead of the Capacitor

Re-run at the same frequencies. The ratio should now increase with frequency instead of decreasing.

---

### Prediction Table

<div class="result-block">
<table>
  <thead><tr><th>Frequency (Hz)</th><th>LP V<sub>OUT</sub>/V<sub>IN</sub> (simulated)</th><th>HP V<sub>OUT</sub>/V<sub>IN</sub> (simulated)</th></tr></thead>
  <tbody>
    <tr><td>10</td><td><input class="result-input" id="lab02-sim2-lp10" placeholder="ratio"></td><td><input class="result-input" id="lab02-sim2-hp10" placeholder="ratio"></td></tr>
    <tr><td>100</td><td><input class="result-input" id="lab02-sim2-lp100" placeholder="ratio"></td><td><input class="result-input" id="lab02-sim2-hp100" placeholder="ratio"></td></tr>
    <tr><td>159</td><td><input class="result-input" id="lab02-sim2-lp159" placeholder="ratio"></td><td><input class="result-input" id="lab02-sim2-hp159" placeholder="ratio"></td></tr>
    <tr><td>500</td><td><input class="result-input" id="lab02-sim2-lp500" placeholder="ratio"></td><td><input class="result-input" id="lab02-sim2-hp500" placeholder="ratio"></td></tr>
    <tr><td>1000</td><td><input class="result-input" id="lab02-sim2-lp1k" placeholder="ratio"></td><td><input class="result-input" id="lab02-sim2-hp1k" placeholder="ratio"></td></tr>
    <tr><td>10000</td><td><input class="result-input" id="lab02-sim2-lp10k" placeholder="ratio"></td><td><input class="result-input" id="lab02-sim2-hp10k" placeholder="ratio"></td></tr>
  </tbody>
</table>
</div>

---

## Components Required

- ESP32 DevKit V1
- Breadboard and jumper wires
- 10 kΩ resistor
- 100 µF electrolytic capacitor
- 100 nF ceramic capacitor (for Experiments 5–6)
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Capacitor Polarity

Electrolytic capacitors are polarised.

```text
Long leg  → Positive (+)
Short leg → Negative (−)  ← connect to GND
```

---

## Calculate the Theoretical Time Constant

$$
\tau = RC = 10\,000 \times 0.0001 = 1\ \text{s}
$$

---

## Experiment 1 - Observe Charging and Discharging

### Objective

Observe the capacitor charging and discharging curves on the oscilloscope.

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

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 5   │ [●]   [ ]   [┐]   [ ]   [ ]       │ ← GPIO18 → a5, Resistor top c5
 6   │ [ ]   [ ]   [│]   [ ]   [ ]       │
 7   │ [ ]   [ ]   [│]   [ ]   [ ]       │  10 kΩ resistor (c5–c8)
 8   │ [ ]   [ ]   [┘]   [ ]   [▲]       │ ← Vc junction: c8 = Cap+ e8  ← CH1 probe tip
 9   │ [ ]   [ ]   [ ]   [ ]    │         │  100 µF cap body
10   │ [ ]   [ ]   [ ]   [ ]   [▼]       │ ← Cap− at e10 → GND
     └─────────────────────────────────────┘
```

**Row 8 is the Vc junction.** All holes in row 8 are internally linked, so `c8` (resistor bottom) and `e8` (cap positive) are at the same voltage. Connect the CH1 probe tip here.

> Electrolytic cap polarity: **long leg = positive (+)** in row 8; **short leg = negative (−)** in row 10.

---

### Step-by-Step Wiring

1. Insert the **10 kΩ resistor** vertically: one leg in **row 5, column c**, other in **row 8, column c**.
2. Connect a jumper wire from **ESP32 GPIO18** to **row 5, column a**.
3. Insert the **100 µF electrolytic capacitor** vertically: **long leg (positive)** in **row 8, column e**, **short leg (negative)** in **row 10, column e**.
4. Connect a jumper wire from **row 10, column e** to any **GND pin** on the ESP32.
5. Hook the **CH1 probe tip** to any hole in **row 8** (the Vc junction).
6. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

---

### Wiring Checklist

Before uploading:

✅ Resistor leg in same row as GPIO18 jumper (row 5)

✅ Capacitor positive leg in same row as resistor bottom (row 8 = Vc)

✅ Capacitor negative leg connected to GND

✅ Oscilloscope probe tip at Vc junction

✅ Oscilloscope probe ground at ESP32 GND

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
    // Set GPIO18 HIGH for 3 seconds → capacitor charges toward V_S.
    digitalWrite(18, HIGH);
    delay(3000);

    // Set GPIO18 LOW for 3 seconds → capacitor discharges toward 0 V.
    digitalWrite(18, LOW);
    delay(3000);
}
```

> **Arduino Uno:** replace GPIO18 with pin 9 and use `pinMode(9, OUTPUT)` / `digitalWrite(9, ...)` instead of LEDC.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 1 V/div | 1 V/div |
| Horizontal scale | 500 ms/div | 500 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Charging Curve

```text
3.3V │          _______
     │       ╱
     │     ╱
     │   ╱
0V   └─────────────────
          Time →
```

---

### Observe

You should see the voltage rise slowly from 0 V toward $V_S$ (charging) then fall slowly back toward 0 V (discharging), repeatedly.

---

## Experiment 2 - Measure the Time Constant

### Objective

Verify the theoretical time constant by measuring the time for $V_C$ to reach $0.632 \times V_S$.

---

### Procedure

1. Observe the charging curve on the oscilloscope.
2. Identify the target voltage at $0.632 \times V_S = 0.632 \times 3.3 \approx 2.09\ \text{V}$.
3. Measure the time from the start of charging to the point where $V_C$ reaches 2.09 V.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Theory</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Resistance</td><td>10 kΩ</td><td><input class="result-input" id="lab02-exp2-r" placeholder="kΩ"></td></tr>
    <tr><td>Capacitance</td><td>100 µF</td><td><input class="result-input" id="lab02-exp2-c" placeholder="µF"></td></tr>
    <tr><td>Time Constant τ</td><td>1.0 s</td><td><input class="result-input" id="lab02-exp2-tau" placeholder="s"></td></tr>
    <tr><td>Voltage at τ</td><td>2.09 V</td><td><input class="result-input" id="lab02-exp2-vtau" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 3 - Change the Capacitor

Replace the 100 µF capacitor with a **10 µF** capacitor.

$$
\tau = RC = 10\,000 \times 10 \times 10^{-6} = 0.1\ \text{s}
$$

Adjust the horizontal scale to **50 ms/div**.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Capacitor</th><th>Theoretical τ</th><th>Measured τ</th></tr></thead>
  <tbody>
    <tr><td>100 µF</td><td>1.0 s</td><td><input class="result-input" id="lab02-exp3-tau100" placeholder="s"></td></tr>
    <tr><td>10 µF</td><td>0.1 s</td><td><input class="result-input" id="lab02-exp3-tau10" placeholder="s"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 4 - Change the Resistor

Return the capacitor to **100 µF** and replace the 10 kΩ resistor with a **1 kΩ** resistor.

$$
\tau = RC = 1\,000 \times 100 \times 10^{-6} = 0.1\ \text{s}
$$

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>Resistor</th><th>Theoretical τ</th><th>Measured τ</th></tr></thead>
  <tbody>
    <tr><td>10 kΩ</td><td>1.0 s</td><td><input class="result-input" id="lab02-exp4-tau10k" placeholder="s"></td></tr>
    <tr><td>1 kΩ</td><td>0.1 s</td><td><input class="result-input" id="lab02-exp4-tau1k" placeholder="s"></td></tr>
  </tbody>
</table>
</div>

---

## From Time Domain to Frequency Domain

The time constant and cutoff frequency describe the same RC circuit from two different angles:

$$
\tau = RC \qquad \Longleftrightarrow \qquad f_c = \frac{1}{2\pi RC} = \frac{1}{2\pi\tau}
$$

Experiments 1–4 used **10 kΩ + 100 µF** giving τ = 1 s and $f_c \approx 0.16$ Hz — far too slow to sweep with a signal generator.

For Experiments 5 and 6, switch to **10 kΩ + 100 nF** (the 100 nF ceramic capacitor from the Beginner Parts Kit):

$$
\tau = 10000 \times 100 \times 10^{-9} = 1\ \text{ms} \qquad f_c = \frac{1}{2\pi \times 0.001} \approx 159\ \text{Hz}
$$

This places the cutoff inside the OWON signal generator’s practical range.

---

## Experiment 5 - Low-Pass Filter Frequency Response

### Objective

Measure the frequency response of an RC low-pass filter using the OWON signal generator.
Verify that the measured cutoff frequency matches the calculated value $f_c \approx 159$ Hz.

---

### Components

- 10 kΩ resistor
- **100 nF ceramic capacitor** (non-polarised — the 100 nF from the Beginner Parts Kit, **not** the electrolytic used in Experiments 1–4)

---

### Circuit

```text
         10 kΩ
VIN ─────┤R├─────┬──── VOUT (CH2 probe tip)
                 │
               100 nF
                 │
GND ─────────────┘──── probe ground
```

Output is across the capacitor. Low frequencies pass; high frequencies are attenuated.

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 5   │ [●]   [ ]   [┐]   [ ]   [ ]       │ ← GEN OUT → a5, Resistor top c5 (VIN)
 6   │ [ ]   [ ]    │    [ ]   [ ]       │  10 kΩ resistor body
 7   │ [ ]   [ ]   [┘]   [ ]   [┐]       │ ← Resistor bottom c7 = Cap top e7 = VOUT (same row)
 8   │ [ ]   [ ]   [ ]   [ ]   [┘]       │ ← Cap bottom e8 → GND
     └─────────────────────────────────────┘
```

Row 7 is the VOUT junction (`c7` and `e7` are the same row — no jumper needed).

---

### Signal Generator and Probe Setup

1. Configure the OWON signal generator: **Sine, 2 Vpp, 0 V offset**.
2. Connect **GEN OUT** to row 5 (VIN). Connect **GEN GND** to the GND rail.
3. **CH1 probe tip** → row 5 (VIN). CH1 ground → GND rail.
4. **CH2 probe tip** → row 7 (VOUT). CH2 ground → GND rail.

---

### Procedure and Measurements

Change the generator frequency for each row. Record CH1 Vpp (input) and CH2 Vpp (output).

<div class="result-block">
<table>
  <thead><tr><th>Frequency</th><th>CH1 Vpp (V<sub>IN</sub>)</th><th>CH2 Vpp (V<sub>OUT</sub>)</th><th>Ratio V<sub>OUT</sub>/V<sub>IN</sub></th></tr></thead>
  <tbody>
    <tr><td>10 Hz</td><td><input class="result-input" id="lab02-exp5-vin10" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-vout10" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-ratio10" placeholder=""></td></tr>
    <tr><td>100 Hz</td><td><input class="result-input" id="lab02-exp5-vin100" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-vout100" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-ratio100" placeholder=""></td></tr>
    <tr><td>159 Hz</td><td><input class="result-input" id="lab02-exp5-vin159" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-vout159" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-ratio159" placeholder=""></td></tr>
    <tr><td>500 Hz</td><td><input class="result-input" id="lab02-exp5-vin500" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-vout500" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-ratio500" placeholder=""></td></tr>
    <tr><td>1 kHz</td><td><input class="result-input" id="lab02-exp5-vin1k" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-vout1k" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-ratio1k" placeholder=""></td></tr>
    <tr><td>10 kHz</td><td><input class="result-input" id="lab02-exp5-vin10k" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-vout10k" placeholder="V"></td><td><input class="result-input" id="lab02-exp5-ratio10k" placeholder=""></td></tr>
  </tbody>
</table>
</div>

At $f_c \approx 159$ Hz the ratio should be approximately **0.707** (−3 dB).

---

## Experiment 6 - High-Pass Filter

### Objective

Swap R and C to form a high-pass filter.
Show that the same component values give the same cutoff frequency but opposite attenuation behaviour.

---

### Circuit

Swap the positions of R and C. Output is now across the resistor:

```text
         100 nF
VIN ─────┤C├─────┬──── VOUT (CH2 probe tip)
                 │
               10 kΩ
                 │
GND ─────────────┘──── probe ground
```

High frequencies pass; low frequencies are attenuated. Cutoff frequency is unchanged:

$$
f_c = \frac{1}{2\pi RC} \approx 159\ \text{Hz}
$$

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 5   │ [●]   [ ]   [┐]   [ ]   [ ]       │ ← GEN OUT → a5, Cap top c5 (VIN)
 6   │ [ ]   [ ]   [┘]   [ ]   [┐]       │ ← Cap bottom c6 = Resistor top e6 = VOUT (same row)
 7   │ [ ]   [ ]   [ ]   [ ]    │         │  10 kΩ resistor body
 8   │ [ ]   [ ]   [ ]   [ ]   [┘]       │ ← Resistor bottom e8 → GND
     └─────────────────────────────────────┘
```

Row 6 is the VOUT junction. Compare this layout to Experiment 5 — only R and C positions are swapped.

---

### Signal Generator and Probe Setup

Same generator settings as Experiment 5.

1. Connect **GEN OUT** to row 5 (VIN). Connect **GEN GND** to GND rail.
2. **CH1 probe tip** → row 5 (VIN). CH1 ground → GND rail.
3. **CH2 probe tip** → row 6 (VOUT). CH2 ground → GND rail.

---

### Procedure and Measurements

<div class="result-block">
<table>
  <thead><tr><th>Frequency</th><th>CH1 Vpp (V<sub>IN</sub>)</th><th>CH2 Vpp (V<sub>OUT</sub>)</th><th>Ratio V<sub>OUT</sub>/V<sub>IN</sub></th></tr></thead>
  <tbody>
    <tr><td>10 Hz</td><td><input class="result-input" id="lab02-exp6-vin10" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-vout10" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-ratio10" placeholder=""></td></tr>
    <tr><td>100 Hz</td><td><input class="result-input" id="lab02-exp6-vin100" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-vout100" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-ratio100" placeholder=""></td></tr>
    <tr><td>159 Hz</td><td><input class="result-input" id="lab02-exp6-vin159" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-vout159" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-ratio159" placeholder=""></td></tr>
    <tr><td>500 Hz</td><td><input class="result-input" id="lab02-exp6-vin500" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-vout500" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-ratio500" placeholder=""></td></tr>
    <tr><td>1 kHz</td><td><input class="result-input" id="lab02-exp6-vin1k" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-vout1k" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-ratio1k" placeholder=""></td></tr>
    <tr><td>10 kHz</td><td><input class="result-input" id="lab02-exp6-vin10k" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-vout10k" placeholder="V"></td><td><input class="result-input" id="lab02-exp6-ratio10k" placeholder=""></td></tr>
  </tbody>
</table>
</div>

At $f_c \approx 159$ Hz the ratio should again be approximately **0.707**.

---

### LP vs HP Comparison

<div class="result-block">
<table>
  <thead><tr><th>Frequency</th><th>LP Ratio (Exp 5)</th><th>HP Ratio (Exp 6)</th><th>Which filter passes?</th></tr></thead>
  <tbody>
    <tr><td>10 Hz</td><td><input class="result-input" id="lab02-comp-lp10" placeholder=""></td><td><input class="result-input" id="lab02-comp-hp10" placeholder=""></td><td><input class="result-input" id="lab02-comp-which10" placeholder=""></td></tr>
    <tr><td>159 Hz</td><td>≈0.707</td><td>≈0.707</td><td>Both at cutoff</td></tr>
    <tr><td>1 kHz</td><td><input class="result-input" id="lab02-comp-lp1k" placeholder=""></td><td><input class="result-input" id="lab02-comp-hp1k" placeholder=""></td><td><input class="result-input" id="lab02-comp-which1k" placeholder=""></td></tr>
    <tr><td>10 kHz</td><td><input class="result-input" id="lab02-comp-lp10k" placeholder=""></td><td><input class="result-input" id="lab02-comp-hp10k" placeholder=""></td><td><input class="result-input" id="lab02-comp-which10k" placeholder=""></td></tr>
  </tbody>
</table>
</div>

Below $f_c$: LP ratio → 1, HP ratio → 0. Above $f_c$: opposite.

---

## MATLAB Filter Frequency Response

Use this script to plot the theoretical LP and HP frequency response and overlay your measured data points from Experiments 5 and 6.

```matlab
R = 10000;
C = 100e-9;
fc = 1 / (2 * pi * R * C);      % cutoff frequency (~159 Hz)

% Transfer functions (Control System Toolbox)
LP = tf([1/(R*C)], [1, 1/(R*C)]);
HP = tf([1,    0], [1, 1/(R*C)]);

f = logspace(1, 5, 400);         % 10 Hz to 100 kHz, log-spaced

[mag_LP, ~] = bode(LP, 2*pi*f);
[mag_HP, ~] = bode(HP, 2*pi*f);

figure; hold on;
semilogx(f, squeeze(mag_LP), 'b-', 'LineWidth', 2, 'DisplayName', 'LP theory');
semilogx(f, squeeze(mag_HP), 'r-', 'LineWidth', 2, 'DisplayName', 'HP theory');
xline(fc, 'k--', sprintf('f_c = %.0f Hz', fc), 'LabelVerticalAlignment', 'bottom');
yline(0.707, 'k:', '0.707  (-3 dB)');
xlabel('Frequency (Hz)'); ylabel('|V_{OUT}/V_{IN}|');
title(sprintf('RC Filter Frequency Response — R=%dk\\Omega, C=%dnF', R/1e3, C*1e9));
legend('Location', 'west'); grid on;
ylim([0 1.1]); xlim([10 1e5]);

% --- Replace NaN values with your measured ratios from the tables ---
f_pts   = [10,  100,  159,  500,  1000, 10000];
LP_meas = [NaN, NaN, NaN, NaN, NaN, NaN];   % VOUT/VIN from Experiment 5
HP_meas = [NaN, NaN, NaN, NaN, NaN, NaN];   % VOUT/VIN from Experiment 6

scatter(f_pts, LP_meas, 80, 'b', 'filled', 'DisplayName', 'LP measured');
scatter(f_pts, HP_meas, 80, 'r', 'filled', 'DisplayName', 'HP measured');
legend('Location', 'west');
```

### What to observe

- Your measured LP points should lie on the blue curve; HP points on the red curve.
- At 159 Hz both curves cross at 0.707 — your measurements should confirm this.
- The LP slope above $f_c$ is −20 dB/decade; the HP slope below $f_c$ is +20 dB/decade.
- Any systematic offset between theory and measurement is usually caused by component tolerance (resistors ±1–5%, capacitors ±10–20%).

---

## MATLAB Comparison

```matlab
R = 10000;
C = 100e-6;
Vs = 3.3;                   % ESP32 supply voltage
tau_theory = R * C;
tau_measured = 1.0;          % replace with your measured value (s)

t = 0:0.001:5;

Vc_theory   = Vs * (1 - exp(-t / tau_theory));
Vc_measured = Vs * (1 - exp(-t / tau_measured));

figure; hold on;
plot(t, Vc_theory,   'b--', 'LineWidth', 2, 'DisplayName', ...
    sprintf('Theory  \\tau = %.3fs', tau_theory));
plot(t, Vc_measured, 'r',   'LineWidth', 2, 'DisplayName', ...
    sprintf('Measured \\tau = %.3fs', tau_measured));
yline(0.632*Vs, 'k:', sprintf('63.2%% threshold = %.2fV', 0.632*Vs));
grid on;
xlabel('Time (s)'); ylabel('Capacitor Voltage (V)');
title('RC Charging — Theory vs Measurement');
legend('Location','southeast');
```

---

## Troubleshooting

### Flat Line on Oscilloscope

Check:

✅ Probe tip connected to Vc junction

✅ Probe ground connected to ESP32 GND

✅ Code uploaded and ESP32 powered

---

### Troubleshooting Checklist

✅ Capacitor polarity correct

✅ Probe connected to Vc

✅ Probe ground connected to GND

✅ ESP32 powered and sketch uploaded

✅ Horizontal scale set to approximately 500 ms/div for τ = 1 s

✅ Trigger enabled

---

## Knowledge Check

### Question 1

What is a time constant?

---

### Question 2

What voltage should the capacitor reach after one time constant when charging to 3.3 V?

---

### Question 3

What happens to the time constant when capacitance increases?

---

### Question 4

What happens to the time constant when resistance increases?

---

### Question 5

Why is an RC circuit considered a first-order system?

---

### Question 6

Your MATLAB simulation predicted τ = 1.0 s but you measured τ = 1.15 s. Name two physical reasons that could explain this discrepancy.

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab02">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab02">✕ Clear All Results</button>
</div>

---

## Project Summary

In this project you learned:

✅ Capacitor operation

✅ Energy storage

✅ RC circuits

✅ Exponential charging

✅ Exponential discharging

✅ Time constants

✅ First-order systems

✅ Oscilloscope transient measurements

✅ MATLAB modelling

✅ RC low-pass filter frequency response

✅ RC high-pass filter

✅ Cutoff frequency measurement and verification

---

## Next Project

```text
03_RLC_Circuits.md
```

Topics:

- Inductors
- Resonance
- Ringing
- Natural Frequency
- Damping Ratio
- Second-Order Systems
- Oscillatory Response
