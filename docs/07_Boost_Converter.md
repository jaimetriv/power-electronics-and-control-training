# Project 07 - Boost Converter Operation

---

## Reading Before the Lab

Read _Fundamentals of Electric Circuits_ by Alexander and Sadiku, Chapters 6–7, for inductor/capacitor energy storage and transient response. Then read _Fundamentals of Power Electronics_ by Erickson and Maksimovic, Chapter 3, **Steady-State Converter Analysis**, for **boost converters**, **inductor energy transfer**, **CCM**, **DCM**, and **duty-ratio limits**. Predict $V_o\approx V_{in}/(1-D)$ in ideal CCM and explain why high duty ratio increases stress.

---

## Objective

In this project you will learn:

- What a Boost Converter is
- How a Boost Converter increases voltage
- How inductors store and transfer energy
- Why the output voltage can exceed the input voltage
- How duty cycle controls output voltage
- How to measure switching waveforms
- How Boost Converters compare to Buck Converters

This project introduces the second major non-isolated DC-DC converter topology.

---


## Introduction

A Boost Converter is a step-up DC-DC converter.

Examples:

```text
5 V → 12 V

12 V → 24 V

24 V → 48 V
```

Voltage conversion is achieved using PWM, MOSFET switching, and inductor energy storage — no AC input is required.

---

## Circuit Diagram

```text
5 V current-limited supply
    │
  Inductor (1 mH)
    │
    ├──── Switch Node ──── Diode (1N5819) ──── Vout
    │                      (cathode toward Vout)    │
  MOSFET (AO3400A)                         220 µF capacitor
    │                                               │
   GND ─────────────────────────────────────────────┘
```

---

## Main Components

A Boost Converter contains:

1. Inductor — stores energy in a magnetic field
2. MOSFET — PWM-controlled switch
3. Diode — provides path for inductor current when MOSFET is OFF
4. Capacitor — smooths the output voltage
5. Load

---

## Operating Principle

### Phase 1 — MOSFET ON

Current path:

```text
Input → Inductor → MOSFET → GND
```

During this phase:

- Inductor current increases
- Magnetic energy is stored
- Diode is reverse biased (output capacitor supplies load)

### Phase 2 — MOSFET OFF

When the MOSFET switches OFF, the inductor generates a voltage that forces current through:

```text
Inductor → Diode → Output Capacitor → Load
```

The output voltage becomes higher than the input voltage.

---

## Why Can Output Voltage Exceed Input Voltage?

Recall:

$$
V_L = L\frac{di}{dt}
$$

An inductor resists sudden current change.

When the MOSFET turns OFF, the inductor produces a voltage that adds to the supply voltage.

Therefore:

```text
Output Voltage > Input Voltage
```

is possible.

---

## Volt-Second Balance Derivation

The same volt-second balance principle used in the Buck Converter applies here, but the inductor position and switch action are different.

### Phase 1 — MOSFET ON (duration $DT$)

The MOSFET shorts the switch node to GND.

Applying KVL around the inductor loop:

$$
V_L = V_{IN}
$$

The full input voltage appears across the inductor and current rises.

### Phase 2 — MOSFET OFF (duration $(1-D)T$)

The MOSFET opens. The inductor forces current through the diode into the output capacitor.

Applying KVL:

$$
V_L = V_{IN} - V_{OUT}
$$

Since $V_{OUT} > V_{IN}$, this voltage is negative and current falls.

### Applying Volt-Second Balance

Setting the net volt-seconds to zero:

$$
V_{IN} \cdot DT + (V_{IN} - V_{OUT}) \cdot (1-D)T = 0
$$

Expanding:

$$
V_{IN} \cdot DT + V_{IN} \cdot T - V_{IN} \cdot DT - V_{OUT} \cdot T + V_{OUT} \cdot DT = 0
$$

Simplifying:

$$
V_{IN} \cdot T - V_{OUT} \cdot T + V_{OUT} \cdot DT = 0
$$

$$
V_{IN} = V_{OUT}(1 - D)
$$

Rearranging:

$$
\boxed{V_{OUT} = \frac{V_{IN}}{1 - D}}
$$

---

## Ideal Boost Converter Equation

For an ideal converter operating in steady state and continuous conduction mode (CCM):

$$
V_{OUT} = \frac{V_{IN}}{1 - D}
$$

CCM means that inductor current never reaches zero. Near $D=1$, the ideal expression becomes extremely sensitive to duty-cycle error and predicts impractically large current and voltage; real losses, component ratings, startup transients, and discontinuous conduction limit the usable range.

For hardware, begin at $D=0.25$ and increase only while the measured output voltage, inductor current, diode, MOSFET, capacitor, load, and oscilloscope ratings remain within limits. Treat $D=0.50$ as the highest default hardware test in this lab; the $D=0.75$ case is a simulation prediction unless every component rating has been checked.

Where:

- $V_{OUT}$ = Output Voltage
- $V_{IN}$ = Input Voltage
- $D$ = Duty Cycle

### Example 1

$V_{IN} = 3.3\ \text{V}$, $D = 0.5$:

$$
V_{OUT} = \frac{3.3}{1 - 0.5} = 6.6\ \text{V}
$$

### Example 2

$V_{IN} = 3.3\ \text{V}$, $D = 0.75$:

$$
V_{OUT} = \frac{3.3}{1 - 0.75} = 13.2\ \text{V}
$$

---

## Important Practical Note

Real converters are not ideal.

Actual output voltage is lower because of:

- Diode voltage drop
- MOSFET losses
- Inductor resistance
- Switching losses

---

## Simscape Simulation

Before building the circuit, build a Simscape model to predict the output voltage and inductor current waveforms at each duty cycle.

---

### Step 1 — Create a New Simulink Model

1. In MATLAB, go to **Home** tab → click **Simulink**.
2. Click **Blank Model**.
3. Go to **File → Save** and name the file `Boost_Converter`.

---

### Step 2 — Open the Library Browser

In the Simulink toolbar click **Library Browser** (book icon).

You will use blocks from:

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
| DC Voltage Source | Simscape → Foundation Library → Electrical → Electrical Sources | 1 |
| Inductor | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Ideal Switch | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Diode | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Capacitor | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Resistor | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Voltage Sensor | Simscape → Foundation Library → Electrical → Electrical Sensors | 1 |
| Current Sensor | Simscape → Foundation Library → Electrical → Electrical Sensors | 1 |
| Electrical Reference | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Simulink-PS Converter | Simscape → Utilities | 1 |
| PS-Simulink Converter | Simscape → Utilities | 2 |
| Scope | Simulink → Sinks | 1 |
| Solver Configuration | Simscape → Utilities | 1 |

---

### Step 4 — Configure the Pulse Generator

Double-click the **Pulse Generator** and set:

| Parameter | Value |
|-----------|-------|
| Amplitude | `1` |
| Period | `50e-6` |
| Pulse Width | `10` (percent) |
| Phase delay | `0` |

This produces a 0–1 control signal at 20 kHz. Repeat at 20% and 25% duty; do not test above 25% in this lab.

---

### Step 5 — Configure the DC Voltage Source

This represents the current-limited 5 V bench supply. Use a **DC Voltage Source** block (Simscape → Foundation Library → Electrical → Electrical Sources) set directly to 5 V — no Constant block or Controlled Voltage Source is needed.

Double-click and set:

| Parameter | Value |
|-----------|-------|
| Constant voltage | `5` |

---

### Step 6 — Configure the Inductor

Double-click the **Inductor** and set:

| Parameter | Value |
|-----------|-------|
| Inductance | `1e-3` |

Use the same 1 mH inductor as the physical experiment. With a 100 Ω load, 20 kHz switching, and duty ratios 10%–25%, the ideal inductor peak current stays below approximately 0.13 A.

---

### Step 7 — Configure the Capacitor

Double-click the **Capacitor** and set:

| Parameter | Value |
|-----------|-------|
| Capacitance | `220e-6` |

---

### Step 8 — Configure the Load Resistor

Double-click the **Resistor** and set:

| Parameter | Value |
|-----------|-------|
| Resistance | `100` |

Use a 100 Ω, 1 W load. At the maximum 25% duty ratio the ideal output is 6.67 V and load power is about 0.45 W.

---

### Step 9 — Wire the Circuit

The Boost topology differs from the Buck — the inductor is on the input side and the switch connects the switch node to GND:

```text
DC Voltage Source (+) → Current Sensor (+ port)
Current Sensor (− port)       → Inductor (left port)        [input node]
Inductor (right port)         → Ideal Switch (left port)    [switch node]
Inductor (right port)         → Diode (+ port)              [switch node]
Ideal Switch (right port)     → Electrical Reference
DC Voltage Source (−)          → Electrical Reference

Diode (− port) → Capacitor (p port)    [Vout node]
Diode (− port) → Resistor (left port)  [Vout node]
Capacitor (n port)  → Electrical Reference
Resistor (right port) → Electrical Reference

Voltage Sensor (+ port) → Vout node
Voltage Sensor (− port) → Electrical Reference
```

> Connect the **Pulse Generator** output through a **Simulink-PS Converter** to the **control port** of the Ideal Switch (the signal input on top of the block). The control port expects a physical signal (PS), not a Simulink signal, so the converter is required. When the pulse is HIGH the switch closes, shorting the switch node to GND and storing energy in the inductor. When the pulse is LOW the switch opens and the inductor forces current through the diode to charge the output capacitor.

> The Current Sensor is placed in series on the input side (between the voltage source and the inductor) to measure inductor current.

---

### Step 10 — Connect the PS-Simulink Converters and Scope

1. Connect **Voltage Sensor** output (V port) → **PS-Simulink Converter 1** → **Scope channel 1** (Vout).
2. Connect **Current Sensor** output (I port) → **PS-Simulink Converter 2** → **Scope channel 2** (inductor current).
3. Open the Scope, click the **gear icon (Properties)**, go to the **Inputs** tab and set the number of input ports to `2`.

---

### Step 11 — Connect the Solver Configuration

Drag the **Solver Configuration** block onto the canvas and connect its port to any wire in the Simscape network (e.g. the Vout node).

---

### Step 12 — Simulation Settings

Go to **Modeling → Model Settings** (or press **Ctrl+E**).

Under **Solver**:

| Setting | Value |
|---------|-------|
| Stop time | `0.25` |
| Type | Variable-step |
| Solver | `ode23t` |
| Max step size | `1e-6` |

Click **OK**.

---

### Step 13 — Run and Observe

Click **Run**. Open the Scope.

Channel 1 (Vout) should rise above 3.3 V and settle toward $V_{IN}/(1-D)$. At 50% duty cycle expect approximately 6.6 V.

Channel 2 (inductor current) should show a triangular ripple waveform — note the slope is steeper during the ON phase (energy storing) than the OFF phase (energy releasing), which is the opposite shape to the Buck converter.

---

### Step 14 — Vary the Duty Cycle

Change the **Pulse Width** in the Pulse Generator and re-run for each experiment point:

| Pulse Width (%) | Duty Cycle | Expected $V_{OUT}$ |
|-----------------|------------|--------------------|
| 25 | 25% | 4.4 V |
| 50 | 50% | 6.6 V |
| 75 | 75% | 13.2 V |

---

### Wiring Checklist

✅ Pulse Generator output → Simulink-PS Converter → Ideal Switch control port

✅ Series input path: DC Voltage Source (+) → Current Sensor → Inductor → switch node

✅ Ideal Switch: left port at switch node, right port at Electrical Reference

✅ Diode: (+) at switch node, (−) at Vout node

✅ Capacitor and Resistor both from Vout node to Electrical Reference

✅ Voltage Sensor across Vout node and Electrical Reference

✅ Both PS-Simulink Converters feeding a two-channel Scope

✅ Solver Configuration connected to the physical network

✅ Stop time = 0.04, Solver = ode23t, Max step = 1e-6

---

### Prediction Table

<div class="result-block">
<table>
  <thead><tr><th>PWM Value</th><th>Duty Cycle</th><th>Predicted V<sub>OUT</sub> (V)</th></tr></thead>
  <tbody>
    <tr><td>64</td><td>25%</td><td><input class="result-input" id="lab07-sim-vout25" placeholder="V"></td></tr>
    <tr><td>128</td><td>50%</td><td><input class="result-input" id="lab07-sim-vout50" placeholder="V"></td></tr>
    <tr><td>192</td><td>75%</td><td><input class="result-input" id="lab07-sim-vout75" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Components Required

- AO3400A N-channel MOSFET on a labeled breakout board ($V_{DS}\geq30$ V and $R_{DS(on)}$ specified at $V_{GS}=2.5$ V)
- 1N5819 Schottky Diode
- 1 mH inductor, saturation current at least 0.5 A, DCR no more than 1 Ω, self-resonant frequency at least 200 kHz
- 220 µF, 16 V electrolytic capacitor and 100 nF ceramic input bypass capacitor
- 100 Ω, 1 W load resistor
- 100 Ω gate resistor and 100 kΩ gate-to-source pull-down
- ESP32 DevKit V1
- Breadboard and short jumper wires
- Isolated 0–30 V, 0–3 A bench supply with CC mode, output enable, and current setting resolution of 10 mA or finer; set to 5.0 V / 0.20 A for this lab
- OWON HDS272S oscilloscope with a 10:1 probe

---

## Safety Notice

!!! warning "Use only the specified low-voltage boost operating point"
  Use a 5.0 V isolated bench supply with a 0.20 A current limit, 1 mH inductor rated for at least 0.5 A saturation current, 100 Ω / 1 W load, and duty ratios of 10%, 20%, and 25% only. At 25%, ideal inductor ripple is about 62.5 mA peak-to-peak and expected peak current is about 0.12 A. Do not raise duty ratio or remove the load.

Do not power the converter from an ESP32 pin, USB port, or battery pack. Build with power off. Discharge the output capacitor through the 100 Ω load before handling. Connect the oscilloscope ground only to circuit GND, never to the switch node.

---

## Experiment 1 - Generate the Switching Signal

### Objective

Upload the PWM code and observe the gate switching signal on the oscilloscope before connecting the full converter circuit.

---

### Connections

1. Insert the **CH1 probe BNC** into CH1 on the OWON HDS272S.
2. Hook the **CH1 probe tip** onto **ESP32 GPIO18**.
3. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

```text
CH1 socket    ◄──── BNC connector
ESP32 GND     ◄──── CH1 probe ground
ESP32 GPIO18  ◄──── CH1 probe tip
```

No breadboard components needed — verify the gate signal before building the full converter.

---

### ESP32 Code

```cpp
const int pwmValue = 128; // 50% for the standalone GPIO waveform check only.

void setup()
{
    ledcSetup(0, 20000, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    ledcWrite(0, pwmValue);
}
```

This standalone PWM check is done with the converter disconnected. Use the ESP32; the Arduino Uno's default PWM frequency is not the specified 20 kHz.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 20 µs/div | 20 µs/div |
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

### Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Expected</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Frequency</td><td>~20 kHz</td><td><input class="result-input" id="lab07-exp1-freq" placeholder="Hz"></td></tr>
    <tr><td>Duty Cycle</td><td>~50%</td><td><input class="result-input" id="lab07-exp1-duty" placeholder="%"></td></tr>
    <tr><td>Gate Voltage</td><td>~3.3 V</td><td><input class="result-input" id="lab07-exp1-vgate" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 2 - Build and Test the Boost Converter

### Objective

Build and measure the low-voltage boost converter using the specified 5 V current-limited source, 20 kHz PWM, and 10%–25% duty range.

### Corrected Wiring

```text
5 V → L1 1 mH → switch node → D1 anode
                     │          D1 cathode → VOUT
                     │                         │
                  Q1 drain                  COUT 220 µF (+)
                  Q1 source → GND              │
                     │                      100 Ω load
GPIO18 → 100 Ω → Q1 gate                        │
               100 kΩ gate-to-source          GND
ESP32 GND and supply negative → circuit GND
100 nF and 220 µF input capacitors from +5 V to GND
```

Use an AO3400A breakout with its gate, drain, and source clearly labeled. Verify the diode's banded cathode faces VOUT. Keep the switching loop short.

### First Power-Up and Measurements

1. With supply output disabled, set 5.0 V and a 0.20 A current limit.
2. Connect the 100 Ω load and set `pwmValue` to 26 (about 10%). Check wiring and diode/capacitor polarity.
3. Connect oscilloscope ground to circuit GND. Never clip it to the switch node.
4. Enable power and confirm the supply is not continuously in current limit. Test PWM values 26, 51, and 64 only (about 10%, 20%, and 25%). Turn the supply off before changing wiring.
5. Measure VOUT DC and ripple. For the switch-node waveform, move only the probe tip and keep its ground at circuit GND.

```cpp
const int pwmValue = 26; // Try 26, 51, or 64 only: about 10%, 20%, or 25%.

void setup()
{
    ledcSetup(0, 20000, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    ledcWrite(0, pwmValue);
}
```

Use the ESP32; the Arduino Uno default PWM frequency is not the specified 20 kHz.

| Trace | Probe tip | Probe ground | Suggested setting |
|-------|-----------|--------------|--------------------|
| GPIO control | GPIO18 | Circuit GND | 2 V/div, 20 µs/div |
| Switch node | Q1 drain | Circuit GND | 2 V/div, 20 µs/div |
| Output | VOUT | Circuit GND | 2 V/div, DC coupling |

### Results

<div class="result-block">
<table>
  <thead><tr><th>PWM</th><th>Duty</th><th>Ideal V<sub>OUT</sub> (V)</th><th>Simscape V<sub>OUT</sub> (V)</th><th>Measured V<sub>OUT</sub> (V)</th></tr></thead>
  <tbody>
    <tr><td>26</td><td>10%</td><td>5.56</td><td><input class="result-input" id="lab07-exp2-vout10" placeholder="V"></td><td><input class="result-input" id="lab07-meas-vout10" placeholder="V"></td></tr>
    <tr><td>51</td><td>20%</td><td>6.25</td><td><input class="result-input" id="lab07-exp2-vout20" placeholder="V"></td><td><input class="result-input" id="lab07-meas-vout20" placeholder="V"></td></tr>
    <tr><td>64</td><td>25%</td><td>6.67</td><td><input class="result-input" id="lab07-exp2-vout25" placeholder="V"></td><td><input class="result-input" id="lab07-meas-vout25" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

<!-- Historical layout removed from the rendered lesson; do not restore it as a build guide.

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 2   │ [●]   [ ]   [ ]   [ ]   [ ]       │ ← 3.3V → a2
 3   │ [ ]   [ ]   [ ]   [●]   [ ]       │ ← MOSFET Gate d3
 4   │ [ ]   [┐]   [ ]   [●]   [ ]       │ ← Gate res top b4, MOSFET Drain d4
 5   │ [●]   [┘]   [ ]   [●]   [ ]       │ ← GPIO18 → a5, Gate res bottom b5 (jumper b5→d3), MOSFET Source d5
 6   │ [●]   [ ]   [ ]   [ ]   [ ]       │ ← GND → a6 = MOSFET Source row (jumper a6→d5)
 7   │ [ ]   [ ]   [ ]   [ ]   [┐]       │ ← Inductor top e7 = 3.3V input (jumper a2→e7)
 8   │ [ ]   [ ]   [ ]   [ ]   [│]       │  100 µH inductor body
 9   │ [ ]   [ ]   [A]   [ ]   [┘]       │ ← Inductor bottom e9 = switch node = Diode anode c9  (same row)
10   │ [ ]   [ ]   [│]   [ ]   [ ]       │  1N5819 diode body
11   │ [ ]   [ ]   [K]   [ ]   [▲]       │ ← Diode cathode c11 = Cap+ e11 = Vout  (same row)
12   │ [ ]   [ ]   [ ]   [ ]   [│]       │  100 µF cap body
13   │ [●]   [ ]   [ ]   [ ]   [▼]       │ ← GND → a13, Cap− e13 → GND
     └─────────────────────────────────────┘
```

`[A]` = diode anode (unmarked end); `[K]` = diode cathode (banded end).

Row connections (same row = internally linked):
- Row 9: `e9` (inductor bottom) and `c9` (diode anode) — this is the switch node
- Row 11: `c11` (diode cathode) and `e11` (cap positive) — this is the Vout node

---

### Historical Wiring Notes — Not a Build Procedure

1. Insert the **IRLZ44N MOSFET**: **Gate** at **row 3, col d**, **Drain** at **row 4, col d**, **Source** at **row 5, col d**. Verify G-D-S order from the pinout (Project 04).
2. Connect a jumper wire from **ESP32 GND** to **row 6, col a**, then a short jumper from **row 6, col a** to **row 5, col d** (MOSFET Source).
3. Insert the **220 Ω gate resistor**: one leg in **row 4, col b**, other in **row 5, col b**. Connect **row 5, col b** to **row 3, col d** (MOSFET Gate) with a short jumper.
4. Connect a jumper wire from **ESP32 GPIO18** to **row 5, col a** (same row as gate resistor bottom).
5. Insert the **100 µH inductor**: one leg in **row 7, col e**, other in **row 9, col e** (switch node). Connect **row 2, col a** (3.3V) to **row 7, col e** (inductor top) with a jumper.
6. Connect a short jumper from **row 4, col d** (MOSFET Drain) to **row 9, col e** (switch node) — the MOSFET Drain connects to the switch node.
7. Insert the **1N5819 diode**: **anode** (unmarked end) in **row 9, col c** (switch node, same row as inductor bottom), **cathode** (banded end) in **row 11, col c** (Vout).
8. Insert the **100 µF capacitor**: **positive leg** in **row 11, col e** (same row as diode cathode = Vout), **negative leg** in **row 13, col e**.
9. Connect a jumper wire from **row 13, col e** to **row 13, col a** (GND).
10. Hook the **CH1 probe tip** to **row 11** (Vout junction). Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

The signal path will be:

```text
3.3V → Inductor → Switch Node → Diode (anode) → Diode (cathode) → Vout
                       │
                   MOSFET Drain
                   MOSFET Source
                       │
                      GND
```

---

### Historical Checklist — Not a Build Procedure

Before uploading:

✅ MOSFET Source connected to GND

✅ Inductor between 3.3V supply and switch node (MOSFET Drain)

✅ Diode anode at switch node, cathode toward Vout

✅ Capacitor positive leg at Vout, negative leg at GND

✅ Gate resistor between GPIO18 and MOSFET Gate

✅ Oscilloscope probe tip at Vout, probe GND at ESP32 GND

---

### Disabled ESP32 Sketch

```cpp
void setup()
{
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
  ledcWrite(0, 0);     // Keep the power stage disabled; hardware test is deferred.
  delay(1000);
}
```

> The Arduino equivalent is omitted because this power-stage experiment is deferred.

---

### Simulate the Output Voltage

Use the Simscape model from this lab. Compare its settled output with the ideal CCM prediction. Do not measure a physical boost output from the deferred layout.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>PWM Value</th><th>Duty Cycle</th><th>Ideal CCM reference (simulation)</th><th>Simscape V<sub>OUT</sub> (V)</th></tr></thead>
  <tbody>
    <tr><td>64</td><td>25%</td><td>4.4 V</td><td><input class="result-input" id="lab07-exp2-vout25" placeholder="V"></td></tr>
    <tr><td>128</td><td>50%</td><td>6.6 V</td><td><input class="result-input" id="lab07-exp2-vout50" placeholder="V"></td></tr>
    <tr><td>192</td><td>75%</td><td>13.2 V (simulation only)</td><td><input class="result-input" id="lab07-exp2-vout75" placeholder="V"></td></tr>
  </tbody>
</table>
</div>
-->

---

## Experiment 3 - Analyze Output Ripple

### Objective

Compare output voltage ripple in the Simscape model and the physical boost converter at the switching frequency.

---

Measure ripple at VOUT with the probe ground at circuit GND. For the switch-node waveform, move only the probe tip and keep ground at circuit GND. Do not exceed 25% duty or disconnect the load.

---

### Results

The output should contain an average DC voltage plus a small ripple voltage.

Ripple occurs because the capacitor continuously charges and discharges.

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Simulated</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Peak-to-peak ripple (V)</td><td><input class="result-input" id="lab07-exp3-ripple" placeholder="V"></td><td><input class="result-input" id="lab07-meas-ripple" placeholder="V"></td></tr>
    <tr><td>Ripple frequency (Hz)</td><td><input class="result-input" id="lab07-exp3-freq" placeholder="Hz"></td><td><input class="result-input" id="lab07-meas-freq" placeholder="Hz"></td></tr>
  </tbody>
</table>
</div>

---

## Comparing Buck and Boost Converters

| Property | Buck Converter | Boost Converter |
|----------|---------------|----------------|
| Purpose | Step Down Voltage | Step Up Voltage |
| Uses PWM | Yes | Yes |
| Uses MOSFET | Yes | Yes |
| Uses Inductor | Yes | Yes |
| Uses Capacitor | Yes | Yes |
| Output Voltage | Lower Than Input | Higher Than Input |
| Equation | $V_{OUT} = D \cdot V_{IN}$ | $V_{OUT} = V_{IN}/(1-D)$ |

---

## MATLAB Comparison

Overlay the simulated settled output voltages against the ideal CCM Boost curve and compare with the Buck simulation from Project 06.

```matlab
Vin = 3.3;

D_simulated    = [0.25,  0.50,  0.75];
Vout_simulated = [0.00,  0.00,  0.00];   % replace with settled Simscape values (V)

D_ideal  = 0:0.001:0.95;
Vout_ideal = Vin ./ (1 - D_ideal);

figure; hold on;
plot(D_ideal, Vout_ideal, 'b--', 'LineWidth', 2, ...
    'DisplayName', 'Ideal: V_{OUT} = V_{IN}/(1-D)');
scatter(D_simulated, Vout_simulated, 80, 'r', 'filled', ...
  'DisplayName', 'Simulated');
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Boost Converter - Ideal vs Measured');
legend('Location', 'northwest');
ylim([0 25]);

fprintf('%-8s %-12s %-12s %-14s %-12s\n', ...
  'D', 'V_ideal(V)', 'V_sim(V)', 'Ratio_ideal', 'Ratio_sim');
for i = 1:3
  V_ideal  = Vin / (1 - D_simulated(i));
    M_ideal  = V_ideal / Vin;
  M_sim    = Vout_simulated(i) / Vin;
    fprintf('%-8.2f %-12.2f %-12.2f %-14.2f %-12.2f\n', ...
    D_simulated(i), V_ideal, Vout_simulated(i), M_ideal, M_sim);
end
```

### Buck vs Boost Comparison

```matlab
Vin = 3.3;
D   = 0:0.001:0.95;

Vout_buck  = Vin .* D;
Vout_boost = Vin ./ (1 - D);

figure; hold on;
plot(D, Vout_buck,  'b', 'LineWidth', 2, 'DisplayName', 'Buck: D \cdot V_{IN}');
plot(D, Vout_boost, 'r', 'LineWidth', 2, 'DisplayName', 'Boost: V_{IN}/(1-D)');
yline(Vin, 'k--', sprintf('V_{IN} = %.0fV', Vin));
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Buck vs Boost - Voltage Conversion');
legend('Location', 'north');
ylim([0 20]);
```

### Reflection

- Does the settled Simscape output follow the ideal CCM curve at all three duty cycles? If not, check whether the current remains continuous and whether the model has settled.
- The Boost conversion ratio $M = V_{OUT}/V_{IN}$ becomes very sensitive to D near D = 1. Why is this a practical problem for control?
- How does the inductor current waveform shape differ between the Buck (Project 06) and Boost converters?

---

## Simulation Troubleshooting

### Simulated Output Voltage Does Not Increase

Check the Simscape connections: source-to-inductor-to-switch node, diode anode at the switch node, and diode cathode at Vout.

---

### Simulated Ripple Is Unexpected

Check the simulated component values, load, switching frequency, and that the waveform is sampled finely enough to show switching ripple.

---

### No Switching Signal in the Model

Check the Pulse Generator amplitude, period, pulse width, Simulink-PS conversion, and Ideal Switch control-port connection.

---

### Simulation Checklist

✅ Pulse Generator produces the requested duty cycle and frequency

✅ Ideal Switch control uses the Simulink-PS converted signal

✅ Inductor and diode are connected to the intended boost switch node in Simscape

✅ Simulated output and inductor current have reached steady state before recording values

---

## Knowledge Check

### Question 1

Write the ideal Boost Converter equation.

---

### Question 2

Why can the output voltage exceed the input voltage?

---

### Question 3

What is the role of the diode in a Boost Converter?

---

### Question 4

What stores energy in a Boost Converter?

---

### Question 5

What happens when duty cycle increases?

---

### Question 6

The ideal CCM equation predicts $V_{OUT}=13.2\ \mathrm{V}$ at $D=0.75$ with $V_{IN}=3.3\ \mathrm{V}$. Explain why this is only a simulation prediction in this course and why the ideal gain becomes very sensitive to duty-ratio changes near $D=1$.

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab07">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab07">✕ Clear All Results</button>
</div>

---


## Next Project

```text
08_PWM_Motor_Control.md
```

