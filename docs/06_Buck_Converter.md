# Project 06 - Buck Converter Operation

---

## Reading Before the Lab

Read _Fundamentals of Electric Circuits_ by Alexander and Sadiku, Chapters 6–7, for inductor/capacitor energy storage and transient response. Then read _Fundamentals of Power Electronics_ by Erickson and Maksimovic, Chapter 3, **Steady-State Converter Analysis**, for **buck converters**, **volt-second balance**, **charge balance**, **CCM**, **DCM**, and **ripple**. State the conduction-mode assumptions, predict $V_o\approx DV_{in}$ in ideal CCM, and estimate current and voltage ripple.

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
5 V current-limited supply
   │
 P-channel MOSFET (AO3401A)
   │──── Switch node ── 1 mH ── VOUT
   │          │                    │
   │       1N5819                 100 µF
   │ cathode at node               │
   │       anode                47 Ω load
   │          │                    │
  GND ────────┴────────────────────┘
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

## Volt-Second Balance Derivation

In steady state the average voltage across the inductor must be zero — otherwise the current would drift without bound.

This condition is called **volt-second balance**.

### Phase 1 — MOSFET ON (duration $DT$)

The switch node is connected to $V_{IN}$.

Applying KVL around the inductor loop:

$$
V_L = V_{IN} - V_{OUT}
$$

The inductor voltage is positive, so current rises.

### Phase 2 — MOSFET OFF (duration $(1-D)T$)

The freewheel diode conducts and the switch node is clamped to approximately 0 V.

Applying KVL:

$$
V_L = 0 - V_{OUT} = -V_{OUT}
$$

The inductor voltage is negative, so current falls.

### Applying Volt-Second Balance

The net volt-seconds over one complete period must equal zero:

$$
(V_{IN} - V_{OUT}) \cdot DT + (-V_{OUT}) \cdot (1-D)T = 0
$$

Expanding:

$$
V_{IN} \cdot DT - V_{OUT} \cdot DT - V_{OUT} \cdot T + V_{OUT} \cdot DT = 0
$$

Simplifying:

$$
V_{IN} \cdot DT - V_{OUT} \cdot T = 0
$$

Dividing through by $T$:

$$
\boxed{V_{OUT} = D \cdot V_{IN}}
$$

---

## Ideal Buck Converter Equation

For an ideal converter operating in steady state and continuous conduction mode (CCM):

$$
V_{OUT} = D \cdot V_{IN}
$$

CCM means that inductor current never reaches zero. In discontinuous conduction mode, the conversion ratio also depends on inductance, switching frequency, load, and input voltage, so this simple expression no longer applies. Real measurements also include diode drop, switch loss, inductor resistance, capacitor ESR, and output ripple.

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
| Simulink-PS Converter | Simscape → Utilities | 1 |
| PS-Simulink Converter | Simscape → Utilities | 2 |
| Scope | Simulink → Sinks | 1 |
| Solver Configuration | Simscape → Utilities | 1 |

---

### Step 4 — Configure the Pulse Generator

Double-click the **Pulse Generator** and set:

| Parameter | Value |
|-----------|-------|
| Amplitude | `5` |
| Period | `50e-6` |
| Pulse Width | `50` (percent) |
| Phase delay | `0` |

This produces a 0–5 V switched input at 20 kHz, 50% duty cycle. Change Pulse Width to 25% and 75% for the other cases.

---

### Step 5 — Configure the Controlled Voltage Source

This represents the 5 V bench supply. The Controlled Voltage Source input port expects a physical signal (PS), not a Simulink signal, so the Pulse Generator output must pass through a **Simulink-PS Converter** before reaching it — see Step 9 for wiring. The source switches between 0 V and 5 V with the PWM signal.

> `Constant voltage: 1` means the source outputs exactly the value of its input signal with no scaling. The Pulse Generator amplitude of 5 sets the source voltage.

Double-click and set:

| Parameter | Value |
|-----------|-------|
| Constant voltage | `1` |

---

### Step 6 — Configure the Inductor

Double-click the **Inductor** and set:

| Parameter | Value |
|-----------|-------|
| Inductance | `1e-3` |

Use the same 1 mH value as the physical experiment. With $R=47\ \Omega$, $f_s=20\ \mathrm{kHz}$, and $D=0.25$–$0.75$, the ideal model remains in CCM.

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
| Resistance | `47` |

This represents the physical 47 Ω, 1 W load. At 75% duty cycle, the ideal output is 3.75 V and the load dissipates about 0.30 W.

---

### Step 9 — Wire the Circuit

Connect the blocks in this order:

```text
Pulse Generator → Simulink-PS Converter → Controlled Voltage Source (input port)
Simulink-PS Converter → Ideal Switch (control port)

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

> Branch the Simulink-PS Converter output wire to reach both blocks. The converter is required because both destination ports are physical-signal (PS) inputs, not Simulink signal inputs.

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

✅ Pulse Generator output → Simulink-PS Converter → Controlled Voltage Source input AND Ideal Switch control port

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

- AO3401A P-channel MOSFET on a labeled breakout board ($V_{DS}\geq30$ V, with $R_{DS(on)}$ specified at $V_{GS}=-4.5$ V)
- 2N2222 NPN transistor
- 1N5819 Schottky diode
- 1 mH inductor, saturation current at least 0.5 A, DCR no more than 1 Ω, self-resonant frequency at least 200 kHz
- Two 100 µF, 10 V electrolytic capacitors (input and output) and one 100 nF ceramic input bypass capacitor
- 47 Ω, 1 W load resistor
- 2.2 kΩ gate-to-source pull-up, 100 Ω gate resistor, 1 kΩ base resistor, and 100 kΩ base-to-emitter pull-down
- ESP32 DevKit V1
- Breadboard and short jumper wires
- Isolated 0–30 V, 0–3 A bench supply with CC mode, output enable, and current setting resolution of 10 mA or finer; set to 5.0 V / 0.20 A for this lab
- OWON HDS272S oscilloscope with a 10:1 probe

---

## Safety Notice

!!! warning "Use only the corrected low-voltage build below"
  The earlier N-channel breadboard drawing is electrically incorrect and must not be assembled. Use the P-channel high-side switch, transistor gate drive, 5 V supply setting, and 0.20 A current limit specified below. Do not power the converter from an ESP32 pin, USB port, or battery pack.

Build with power off. Verify the P-MOSFET breakout pin labels, diode and capacitor polarity, and common ground before enabling the supply. Stop if the supply remains in current limit or any part warms noticeably.

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
  // Configure LEDC channel 0: 20 kHz, 8-bit resolution.
  ledcSetup(0, 20000, 8);
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
    <tr><td>Frequency</td><td>~20 kHz</td><td><input class="result-input" id="lab06-exp1-freq" placeholder="Hz"></td></tr>
    <tr><td>Duty Cycle</td><td>~50%</td><td><input class="result-input" id="lab06-exp1-duty" placeholder="%"></td></tr>
    <tr><td>Gate Voltage</td><td>~3.3 V</td><td><input class="result-input" id="lab06-exp1-vgate" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 2 - Build and Test the Buck Converter

### Objective

Build the low-voltage P-channel buck stage below. The ESP32 provides only the PWM control signal; the converter input comes from the current-limited bench supply.

---

### Corrected Wiring

```text
Q1 AO3401A source → +5 V; Q1 drain → switch node
Switch node → L1 1 mH → VOUT
D1 1N5819 cathode → switch node; D1 anode → GND
COUT 100 µF (+) and RLOAD 47 Ω → VOUT; their other terminals → GND
CIN 100 µF (+) and 100 nF → +5 V; their other terminals → GND
Q2 2N2222 emitter → GND; collector → 100 Ω → Q1 gate
2.2 kΩ from Q1 gate to Q1 source (+5 V)
GPIO18 → 1 kΩ → Q2 base; 100 kΩ from Q2 base to GND
ESP32 GND and supply negative → circuit GND
```

GPIO18 HIGH turns Q2 on and pulls the P-MOSFET gate low; GPIO18 LOW lets the 2.2 kΩ resistor pull the P-MOSFET gate to its source and turn it off. Verify the MOSFET pinout from the breakout labeling. The diode cathode belongs at the switch node and its anode at GND.

### First Power-Up and Measurements

1. Leave the supply output disabled. Set 5.0 V and a 0.20 A current limit.
2. Upload the sketch below with `pwmValue` set to 0. Confirm GPIO18 is low.
3. Check diode and capacitor polarity, MOSFET breakout labels, resistor values, and common ground. Connect the scope ground only to circuit GND.
4. Enable the supply. Confirm it is not continuously in current limit. Set `pwmValue` to 64, 128, then 192, disabling the supply before rewiring.
5. Measure VOUT relative to GND. To view the switch node, move only the probe tip; leave the probe ground at circuit GND.

```cpp
const int pwmValue = 64; // Try 64, 128, and 192 (about 25%, 50%, and 75%).

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

Use the ESP32 for this 20 kHz experiment; the Arduino Uno's default `analogWrite` frequency does not match this design.

| Trace | Probe tip | Probe ground | Suggested setting |
|-------|-----------|--------------|--------------------|
| GPIO control | GPIO18 | Circuit GND | 2 V/div, 20 µs/div |
| Switch node | Q1 drain | Circuit GND | 2 V/div, 20 µs/div |
| Output ripple | VOUT | Circuit GND | DC coupling for level; AC coupling to inspect ripple |

Never attach an oscilloscope ground clip to the switch node.

<div class="result-block">
<table>
  <thead><tr><th>PWM Value</th><th>Duty Cycle</th><th>Ideal V<sub>OUT</sub> (V)</th><th>Simscape V<sub>OUT</sub> (V)</th><th>Measured V<sub>OUT</sub> (V)</th></tr></thead>
  <tbody>
    <tr><td>64</td><td>25%</td><td>1.25</td><td><input class="result-input" id="lab06-exp2-vout25" placeholder="V"></td><td><input class="result-input" id="lab06-meas-vout25" placeholder="V"></td></tr>
    <tr><td>128</td><td>50%</td><td>2.50</td><td><input class="result-input" id="lab06-exp2-vout50" placeholder="V"></td><td><input class="result-input" id="lab06-meas-vout50" placeholder="V"></td></tr>
    <tr><td>192</td><td>75%</td><td>3.75</td><td><input class="result-input" id="lab06-exp2-vout75" placeholder="V"></td><td><input class="result-input" id="lab06-meas-vout75" placeholder="V"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 3 - Observe Simulated Output Ripple

### Objective

Compare output-voltage ripple in the Simscape model and the physical buck stage.

---

### Expected Result

The output should not be perfectly DC.

You should observe a small ripple at the switching frequency:

```text
DC Output
~~~~~~~~~
Small Ripple
~~~~~~~~~
```

---

### Observe in Simscape and on the Hardware

Use the oscilloscope with the probe ground at circuit GND and tip at VOUT. Use AC coupling or the scope's peak-to-peak measurement to inspect ripple without moving the ground connection. Compare hardware and Simscape values; parasitics and switching losses cause differences.

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Simulated</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Peak-to-peak ripple (V)</td><td><input class="result-input" id="lab06-exp3-ripple" placeholder="V"></td><td><input class="result-input" id="lab06-meas-ripple" placeholder="V"></td></tr>
    <tr><td>Ripple frequency (Hz)</td><td><input class="result-input" id="lab06-exp3-freq" placeholder="Hz"></td><td><input class="result-input" id="lab06-meas-freq" placeholder="Hz"></td></tr>
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

Overlay the simulated settled output voltages against the ideal CCM theory line. This comparison uses the 100 mH ideal teaching model, not the deferred physical parts list.

```matlab
Vin = 3.3;

D_simulated    = [0.25,  0.50,  0.75];
Vout_simulated = [0.00,  0.00,  0.00];   % replace with settled Simscape values (V)

D_ideal  = 0:0.01:1;
Vout_ideal = D_ideal .* Vin;

figure; hold on;
plot(D_ideal, Vout_ideal, 'b--', 'LineWidth', 2, 'DisplayName', 'Ideal: V_{OUT} = D \cdot V_{IN}');
scatter(D_simulated, Vout_simulated, 80, 'r', 'filled', 'DisplayName', 'Simulated');
grid on;
xlabel('Duty Cycle'); ylabel('Output Voltage (V)');
title('Buck Converter - Ideal vs Simulated');
legend('Location', 'northwest');

fprintf('%-8s %-12s %-12s %-12s\n', 'D', 'V_ideal(V)', 'V_sim(V)', 'Difference(V)');
for i = 1:3
    V_ideal = D_simulated(i) * Vin;
    difference = Vout_simulated(i) - V_ideal;
    fprintf('%-8.2f %-12.3f %-12.3f %-12.3f\n', D_simulated(i), V_ideal, Vout_simulated(i), difference);
end
```

### Reflection

- Does the settled simulation approach the ideal CCM prediction at each duty ratio?
- How does changing duty ratio change average output and ripple?
- Which non-ideal effects would need to be added before comparing a future hardware build (diode drop, MOSFET loss, inductor resistance, capacitor ESR)?

---

## Simscape Troubleshooting

### Simulated Output Does Not Rise

Check the Pulse Generator, Simulink-PS converter, Ideal Switch control port, diode orientation, and Simscape references.

---

### Simulated Ripple Is Unexpected

Check the simulated L, C, load, switching frequency, solver step size, and whether the response has reached steady state.

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

For $V_{IN}=3.3\ \mathrm{V}$ and $D=0.5$, the ideal CCM equation predicts $V_{OUT}=1.65\ \mathrm{V}$. For this lab's $L=100\ \mathrm{\mu H}$, $R=100\ \Omega$, and $f_s=500\ \mathrm{Hz}$, estimate the CCM boundary inductance using $L_{crit}=(1-D)R/(2f_s)$. Is the CCM prediction appropriate? Name two real component effects that would also change the measurement; do not treat a fixed diode drop and MOSFET drop as exact corrections independent of current and duty ratio.

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab06">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab06">✕ Clear All Results</button>
</div>

---


## Next Project

```text
07_Boost_Converter.md
```
