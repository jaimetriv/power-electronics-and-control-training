# Project 06 - Buck Converter Fundamentals

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 05_DC_Chopper_Converters.md

---

## Objective

In this project you will learn:

- What a Buck Converter is
- How a Buck Converter reduces voltage
- How PWM controls output voltage
- The role of the MOSFET
- The role of the inductor
- The role of the capacitor
- The role of the freewheel diode
- How energy is transferred in switched-mode power supplies
- How to measure converter waveforms using the OWON HDS272S oscilloscope

This project combines concepts from PWM, RC Circuits, RLC Circuits, MOSFET Switching, and Control Theory, and forms the foundation of modern power electronics.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain Buck Converter operation

✅ Explain inductor energy storage

✅ Explain capacitor filtering

✅ Calculate ideal output voltage

✅ Measure PWM switching signals

✅ Measure output ripple

✅ Understand duty-cycle control

✅ Relate converter operation to previous projects

---

## Introduction

A Buck Converter is a DC-to-DC converter that reduces voltage.

Examples:

```text
12 V → 5 V

24 V → 12 V

48 V → 24 V
```

Unlike resistor-based voltage reduction, a Buck Converter operates with very high efficiency.

---

## Why Not Use a Resistor?

A resistor can reduce voltage, but energy is dissipated as heat.

Power loss:

$$
P = V \cdot I
$$

As current increases, the power loss also increases.

---

## Why Buck Converters Are Efficient

Buck Converters use fast switching instead of continuous dissipation.

The MOSFET is usually either fully ON or fully OFF, which minimises power loss.

---

## Circuit Diagram

```text
3.3 V Supply
    │
   MOSFET (IRLZ44N)
    │
   Inductor (100 µH)
    │
    ├──── Vout ──── Probe Tip
    │         │
   Diode    100 µF capacitor
(1N5819)      │
    │         │
   GND ───────┴──── Probe GND
```

---

## Main Components

A basic Buck Converter contains:

1. MOSFET — high-speed electronic switch
2. Diode — freewheel path for inductor current
3. Inductor — stores energy in a magnetic field
4. Capacitor — smooths the output voltage
5. Load

---

## Role of the MOSFET

The MOSFET acts as a high-speed electronic switch.

The controller generates PWM which controls the average energy transfer from input to output.

---

## Role of the Inductor

The inductor stores energy in a magnetic field:

$$
E = \frac{1}{2}LI^2
$$

When the MOSFET switches OFF, the inductor attempts to keep current flowing — this is one of the key principles behind Buck Converter operation.

---

## Role of the Capacitor

The capacitor smooths the output voltage:

$$
E = \frac{1}{2}CV^2
$$

The capacitor reduces output voltage ripple.

---

## Role of the Diode

When the MOSFET turns OFF, inductor current must continue flowing.

The diode provides an alternative path called the:

```text
Freewheel Path
```

A Schottky diode (1N5819) is preferred because its lower forward voltage drop improves efficiency.

---

## Ideal Buck Converter Equation

$$
V_{OUT} = D \cdot V_{IN}
$$

Where:

- $V_{OUT}$ = Output Voltage
- $V_{IN}$ = Input Voltage
- $D$ = Duty Cycle

### Example 1

$V_{IN} = 12\ \text{V}$, $D = 0.5$:

$$
V_{OUT} = 0.5 \times 12 = 6\ \text{V}
$$

### Example 2

$V_{IN} = 12\ \text{V}$, $D = 0.25$:

$$
V_{OUT} = 0.25 \times 12 = 3\ \text{V}
$$

---

## Operating Principle

### MOSFET ON

Current path:

```text
Input → MOSFET → Inductor → Output
```

The inductor stores energy.

### MOSFET OFF

Current path:

```text
Inductor → Diode → Output
```

Stored magnetic energy continues supplying current to the load.

---

## Simscape Simulation

Before building the circuit, build a Simscape model to predict the output voltage and inductor current waveforms at each duty cycle.

---

### Step 1 — Create a New Simulink Model

1. In MATLAB, go to **Home** tab → click **Simulink**.
2. Click **Blank Model**.
3. Go to **File → Save** and name the file `Buck_Converter`.

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
| Controlled Voltage Source | Simscape → Foundation Library → Electrical → Electrical Sources | 1 |
| Ideal Switch | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Diode | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Inductor | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Capacitor | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Resistor | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| Voltage Sensor | Simscape → Foundation Library → Electrical → Electrical Sensors | 1 |
| Current Sensor | Simscape → Foundation Library → Electrical → Electrical Sensors | 1 |
| Electrical Reference | Simscape → Foundation Library → Electrical → Electrical Elements | 1 |
| PS-Simulink Converter | Simscape → Utilities | 2 |
| Scope | Simulink → Sinks | 1 |
| Solver Configuration | Simscape → Utilities | 1 |

---

### Step 4 — Configure the Pulse Generator

Double-click the **Pulse Generator** and set:

| Parameter | Value |
|-----------|-------|
| Amplitude | `1` |
| Period | `0.002` |
| Pulse Width | `50` (percent) |
| Phase delay | `0` |

This produces a 0–1 control signal at 500 Hz, 50% duty cycle.

---

### Step 5 — Configure the Controlled Voltage Source

This represents the 3.3 V ESP32 supply. Connect the **Pulse Generator** output to its input port — the source will switch between 0 V and 3.3 V following the PWM signal.

Double-click and set:

| Parameter | Value |
|-----------|-------|
| Constant voltage | `3.3` |

> In Simscape 2025b the Controlled Voltage Source scales its output by the input signal. With Amplitude = 1 and Constant voltage = 3.3, the output switches between 0 V and 3.3 V.

---

### Step 6 — Configure the Inductor

Double-click the **Inductor** and set:

| Parameter | Value |
|-----------|-------|
| Inductance | `100e-6` |

---

### Step 7 — Configure the Capacitor

Double-click the **Capacitor** and set:

| Parameter | Value |
|-----------|-------|
| Capacitance | `100e-6` |

---

### Step 8 — Configure the Load Resistor

Double-click the **Resistor** and set:

| Parameter | Value |
|-----------|-------|
| Resistance | `100` |

This represents a 100 Ω load. At 50% duty cycle, Vout ≈ 1.65 V, so load current ≈ 16.5 mA — well within the ESP32 supply capability for simulation purposes.

---

### Step 9 — Wire the Circuit

Connect the blocks in this order:

```text
Pulse Generator → Controlled Voltage Source (input port)

Controlled Voltage Source (+) → Ideal Switch (left port)
Ideal Switch (right port)     → Current Sensor (+ port)
Current Sensor (− port)       → Inductor (left port)       [switch node]
Inductor (right port)         → Capacitor (p port)         [Vout node]
Inductor (right port)         → Resistor (left port)       [Vout node]
Capacitor (n port)            → Electrical Reference
Resistor (right port)         → Electrical Reference
Controlled Voltage Source (−) → Electrical Reference

Diode (+ port) → Electrical Reference
Diode (− port) → switch node (junction between Ideal Switch and Inductor)

Voltage Sensor (+ port) → Vout node (junction of Inductor, Capacitor, Resistor)
Voltage Sensor (− port) → Electrical Reference
```

> The Ideal Switch is controlled by the Pulse Generator signal. Connect the Pulse Generator output to the **control port** (the signal input on top of the Ideal Switch block).

> The Diode acts as the freewheel diode. Its `+` port connects to GND (Electrical Reference) and its `−` port connects to the switch node. This allows inductor current to continue flowing when the switch is open.

> The Current Sensor is placed in series between the switch node and the inductor to measure inductor current.

---

### Step 10 — Connect the PS-Simulink Converters and Scope

1. Connect **Voltage Sensor** output (V port) → **PS-Simulink Converter 1** input → **Scope channel 1** (Vout).
2. Connect **Current Sensor** output (I port) → **PS-Simulink Converter 2** input → **Scope channel 2** (inductor current).
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
| Stop time | `0.04` |
| Type | Variable-step |
| Solver | `ode23t` |
| Max step size | `1e-6` |

This gives 20 switching cycles (20 × 2 ms), enough to see the output voltage settle and the inductor current ripple clearly.

Click **OK**.

---

### Step 13 — Run and Observe

Click **Run**. Open the Scope.

Channel 1 (Vout) should show the output voltage rising from 0 V and settling toward $D \times 3.3$ V.

Channel 2 (inductor current) should show a triangular ripple waveform riding on the average DC current.

---

### Step 14 — Vary the Duty Cycle

Change the **Pulse Width** in the Pulse Generator and re-run for each experiment point:

| Pulse Width (%) | Duty Cycle | Expected $V_{OUT}$ |
|-----------------|------------|--------------------|
| 25 | 25% | 0.83 V |
| 50 | 50% | 1.65 V |
| 75 | 75% | 2.48 V |

---

### Wiring Checklist

✅ Pulse Generator output → Controlled Voltage Source input AND Ideal Switch control port

✅ Series path: Voltage Source (+) → Ideal Switch → Current Sensor → Inductor → Vout node

✅ Freewheel Diode: (+) at Electrical Reference, (−) at switch node

✅ Capacitor and Resistor both connected from Vout node to Electrical Reference

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
    <tr><td>64</td><td>25%</td><td><input class="result-input" id="lab06-sim-vout25" placeholder="V"></td></tr>
    <tr><td>128</td><td>50%</td><td><input class="result-input" id="lab06-sim-vout50" placeholder="V"></td></tr>
    <tr><td>192</td><td>75%</td><td><input class="result-input" id="lab06-sim-vout75" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Components Required

- IRLZ44N MOSFET
- 1N5819 Schottky Diode
- 100 µH Inductor
- 100 µF Electrolytic Capacitor
- 220 Ω gate resistor
- ESP32 DevKit V1
- Breadboard and jumper wires
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Safety Notice

For this introductory project use the **ESP32 3.3 V supply** as the converter input.

If using ESP32 gate drive (~3.3 V), use a logic-level MOSFET with low $R_{DS(on)}$ specified at low $V_{GS}$, or use a gate driver.

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
void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    // Set duty cycle to 128/255 ≈ 50%.
    // This is the switching signal that will drive the MOSFET gate.
    ledcWrite(0, 128);
}
```

> **Arduino Uno:** replace `ledcWrite(0, 128)` with `analogWrite(9, 128)` on pin 9.

---

### Oscilloscope Settings

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

### Measurements

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Expected</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Frequency</td><td>~500 Hz</td><td><input class="result-input" id="lab06-exp1-freq" placeholder="Hz"></td></tr>
    <tr><td>Duty Cycle</td><td>~50%</td><td><input class="result-input" id="lab06-exp1-duty" placeholder="%"></td></tr>
    <tr><td>Gate Voltage</td><td>~3.3 V</td><td><input class="result-input" id="lab06-exp1-vgate" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 2 - Build the Buck Converter and Vary Duty Cycle

### Objective

Build the full converter circuit and observe how duty cycle controls output voltage.

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 2   │ [●]   [ ]   [ ]   [ ]   [ ]       │ ← 3.3V → a2
 3   │ [ ]   [ ]   [ ]   [●]   [ ]       │ ← MOSFET Gate d3
 4   │ [ ]   [┐]   [ ]   [●]   [ ]       │ ← Gate res top b4, MOSFET Drain d4  (same row = switch node)
 5   │ [●]   [┘]   [ ]   [●]   [ ]       │ ← GPIO18 → a5, Gate res bottom b5 = Gate d3 row (jumper b5→d3)
 6   │ [ ]   [ ]   [ ]   [ ]   [ ]       │
 7   │ [ ]   [ ]   [A]   [ ]   [┐]       │ ← Diode anode c7 = switch node, Inductor top e7  (same row)
 8   │ [ ]   [ ]   [K]   [ ]   [│]       │  1N5819 diode body, Inductor body
 9   │ [●]   [ ]   [ ]   [ ]   [┘]       │ ← GND → a9, Diode cathode c9 = GND, Inductor bottom e9 = Vout
10   │ [ ]   [ ]   [ ]   [ ]   [▲]       │ ← Cap+ e10 = Vout (same row as inductor bottom e9)
11   │ [ ]   [ ]   [ ]   [ ]   [│]       │  100 µF cap body
12   │ [●]   [ ]   [ ]   [ ]   [▼]       │ ← GND → a12, Cap− e12 → GND
     └─────────────────────────────────────┘
```

`[A]` = diode anode (unmarked end); `[K]` = diode cathode (banded end).

Row connections (same row = internally linked):
- Row 4: `b4` (gate resistor top) and `d4` (MOSFET Drain) — Drain is the converter input (3.3V side)
- Row 7: `c7` (diode anode) and `e7` (inductor top) — this is the switch node
- Row 9: `c9` (diode cathode) and `a9` (GND wire) — freewheel diode returns to GND
- Row 9/10: inductor bottom `e9` and cap positive `e10` are adjacent — use a short jumper wire between them for the Vout junction

---

### Step-by-Step Wiring

1. Insert the **IRLZ44N MOSFET**: **Gate** at **row 3, col d**, **Drain** at **row 4, col d**, **Source** at **row 5, col d**. Verify G-D-S order from the pinout (Project 04).
2. Connect a jumper wire from **ESP32 GND** to **row 9, col a** and another to **row 12, col a**.
3. Connect a jumper wire from **ESP32 3.3V** to **row 2, col a**. Then connect **row 2, col a** to **row 4, col a** (MOSFET Drain = converter input).
4. Insert the **220 Ω gate resistor**: one leg in **row 4, col b**, other in **row 5, col b**.
5. Connect a jumper wire from **ESP32 GPIO18** to **row 5, col a** (same row as gate resistor bottom). Connect **row 5, col b** to **row 3, col d** (MOSFET Gate) with a short jumper.
6. Insert the **1N5819 diode**: **anode** (unmarked end) in **row 7, col c**, **cathode** (banded end) in **row 9, col c**. This is the freewheel diode — anode at switch node, cathode at GND.
7. Insert the **100 µH inductor**: one leg in **row 7, col e** (switch node, same row as diode anode), other leg in **row 9, col e** (Vout).
8. Insert the **100 µF capacitor**: **positive leg** in **row 10, col e**, **negative leg** in **row 12, col e**. Connect **row 9, col e** to **row 10, col e** with a short jumper (Vout junction).
9. Hook the **CH1 probe tip** to **row 9/10** (Vout junction). Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

The signal path will be:

```text
3.3V → MOSFET Drain → (switch node) → Inductor → Vout
                            │
                         Diode (anode at switch node, cathode at GND)
                                              │
                                    Capacitor (Vout to GND)
```

---

### Wiring Checklist

Before uploading:

✅ MOSFET Source connected to GND

✅ MOSFET Drain connected to 3.3V supply

✅ Gate resistor between GPIO18 and MOSFET Gate

✅ Inductor between switch node (MOSFET Drain side) and Vout

✅ Freewheel diode: anode at switch node, cathode at GND

✅ Capacitor positive leg at Vout, negative leg at GND

✅ CH1 probe tip at Vout, CH1 probe ground at ESP32 GND

---

### ESP32 Code

```cpp
void setup()
{
    ledcSetup(0, 500, 8);
    ledcAttachPin(18, 0);
}

void loop()
{
    // Step through three duty cycles with a 3-second pause at each.
    // Expected Vout = D × Vin at each step.

    ledcWrite(0, 64);    // ~25% duty cycle → Vout ≈ 0.83 V
    delay(3000);

    ledcWrite(0, 128);   // ~50% duty cycle → Vout ≈ 1.65 V
    delay(3000);

    ledcWrite(0, 192);   // ~75% duty cycle → Vout ≈ 2.48 V
    delay(3000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin 9.

---

### Oscilloscope Settings — Output Voltage

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 1 V/div | 1 V/div |
| Horizontal scale | 1 s/div | 1 s/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Observe

The output voltage should step between three levels as the code cycles through duty cycles.

Measure the average DC output at each step with a multimeter or the oscilloscope DC measurement.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>PWM Value</th><th>Duty Cycle</th><th>Expected V<sub>OUT</sub> (V)</th><th>Measured V<sub>OUT</sub> (V)</th></tr></thead>
  <tbody>
    <tr><td>64</td><td>25%</td><td>0.83 V</td><td><input class="result-input" id="lab06-exp2-vout25" placeholder="V"></td></tr>
    <tr><td>128</td><td>50%</td><td>1.65 V</td><td><input class="result-input" id="lab06-exp2-vout50" placeholder="V"></td></tr>
    <tr><td>192</td><td>75%</td><td>2.48 V</td><td><input class="result-input" id="lab06-exp2-vout75" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 3 - Observe Output Ripple

### Objective

Measure the output voltage ripple at the switching frequency.

---

### Connections

1. Hook the **CH1 probe tip** to the **Vout node** (lower inductor leg / capacitor positive).
2. Clip the **CH1 probe ground** to any **GND pin** on the ESP32.

> Use AC coupling to isolate the ripple from the DC offset.

---

### Oscilloscope Settings — Ripple

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 200 mV/div | 200 mV/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | AC | AC |

> Switch to AC coupling to zoom in on the ripple while ignoring the DC offset.

---

### Expected Observation

The output should not be perfectly DC.

You should observe a small ripple at the switching frequency:

```text
DC Output
~~~~~~~~~
Small Ripple
~~~~~~~~~
```

---

### Observe

The ripple should be relatively small compared to the average output voltage.

Record the peak-to-peak ripple voltage.

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Peak-to-peak ripple (V)</td><td><input class="result-input" id="lab06-exp3-ripple" placeholder="V"></td></tr>
    <tr><td>Ripple frequency (Hz)</td><td><input class="result-input" id="lab06-exp3-freq" placeholder="Hz"></td></tr>
  </tbody>
</table>
</div>

---

### How Can Ripple Be Reduced?

- Increasing capacitance
- Increasing inductance
- Increasing switching frequency
- Reducing load current variations

---

## MATLAB Comparison

Overlay your measured output voltages against the ideal theory line.

```matlab
Vin = 3.3;

D_measured    = [0.25,  0.50,  0.75];
Vout_measured = [0.00,  0.00,  0.00];   % replace with your measured voltages (V)

D_ideal  = 0:0.01:1;
Vout_ideal = D_ideal .* Vin;

figure; hold on;
plot(D_ideal, Vout_ideal, 'b--', 'LineWidth', 2, 'DisplayName', 'Ideal: V_{OUT} = D \cdot V_{IN}');
scatter(D_measured, Vout_measured, 80, 'r', 'filled', 'DisplayName', 'Measured');
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Buck Converter - Ideal vs Measured');
legend('Location', 'northwest');

fprintf('%-8s %-12s %-12s %-12s\n', 'D', 'V_ideal(V)', 'V_meas(V)', 'Drop(V)');
for i = 1:3
    V_ideal = D_measured(i) * Vin;
    drop    = V_ideal - Vout_measured(i);
    fprintf('%-8.2f %-12.3f %-12.3f %-12.3f\n', D_measured(i), V_ideal, Vout_measured(i), drop);
end
```

### Reflection

- Is the measured Vout lower than the ideal prediction? Why? (MOSFET $V_{DS(on)}$, diode forward voltage drop, inductor DCR)
- Is the voltage drop consistent across all three duty cycles, or does it change?
- How would using a Schottky diode (lower forward voltage) improve the result compared to a standard 1N4007?

---

## Troubleshooting

### No Output Voltage

Check:

✅ MOSFET pinout correct (G, D, S identified)

✅ Diode polarity (cathode banded end toward switch node / 5V side)

✅ Inductor connected between MOSFET Drain and Vout

✅ Shared GND between ESP32 and converter

---

### Excessive Ripple

Check:

✅ Capacitor value (100 µF)

✅ Capacitor polarity (positive leg to Vout)

✅ Load not drawing excessive current

---

### No PWM Signal at Gate

Check:

✅ Gate resistor connected between GPIO18 and MOSFET Gate

✅ Code uploaded successfully

✅ CH1 probe tip on MOSFET Gate, CH1 probe ground on ESP32 GND

---

### Troubleshooting Checklist

✅ PWM present at MOSFET gate

✅ Diode polarity verified

✅ Inductor connected correctly

✅ Capacitor polarity verified

✅ Output voltage measured

✅ Output ripple visible

✅ Duty cycle affects output voltage

---

## Knowledge Check

### Question 1

Write the ideal Buck Converter equation.

---

### Question 2

What is the role of the inductor?

---

### Question 3

What is the role of the capacitor?

---

### Question 4

Why are Buck Converters efficient?

---

### Question 5

What causes output ripple?

---

### Question 6

Your simulation predicted Vout = 2.5 V at 50% duty cycle but you measured 2.1 V. The MOSFET has $V_{DS(on)}$ = 0.1 V and the 1N5819 has a forward voltage of 0.3 V. Show how these account for the 0.4 V discrepancy.

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab06">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab06">✕ Clear All Results</button>
</div>

---

## Project Summary

In this project you learned:

✅ Buck Converter fundamentals

✅ PWM voltage control

✅ MOSFET switching

✅ Inductor energy storage

✅ Capacitor filtering

✅ Output ripple

✅ Converter efficiency

✅ Practical switched-mode power electronics

---

## Next Project

```text
07_Boost_Converter.md
```
