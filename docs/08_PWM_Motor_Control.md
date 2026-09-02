# Project 08 - PWM Motor Control and First-Order System Dynamics

---

## Objective

In this project you will learn:

- How DC motors work
- How PWM controls motor speed
- How a MOSFET controls motor power
- What motor inertia is
- Why motors do not respond instantly
- What a first-order dynamic system is
- How to estimate motor time constants

This project bridges the gap between electronics and control systems.

The motor will become our first real-world dynamic plant.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain DC motor operation

✅ Control motor speed with PWM

✅ Drive a motor using a MOSFET

✅ Measure PWM signals using an oscilloscope

✅ Explain motor inertia

✅ Understand motor time constants

✅ Model a motor as a first-order system

---

## Theory

### What Is a DC Motor?

A DC motor converts electrical energy into mechanical energy.

When voltage is applied:

- Current flows through motor windings
- A magnetic field is created
- Torque is produced
- The shaft begins to rotate

---

## Simplified Motor Model

```text
Voltage → Current → Torque → Speed
```

---

## Why Doesn't a Motor Reach Full Speed Instantly?

Motors have mass and inertia.

Just like a car cannot instantly accelerate from 0 to 70 mph, a motor cannot instantly reach maximum speed.

Instead speed rises gradually, following a first-order exponential response similar to the RC circuit from Project 02.

---

## First-Order Motor Model

A DC motor can often be approximated by:

$$
G(s) = \frac{K}{\tau s + 1}
$$

Where:

- $K$ = System Gain
- $\tau$ = Motor Time Constant

---

## PWM Motor Control

PWM controls the average voltage applied to the motor:

$$
V_{AVG} = D \cdot V_S
$$

The motor receives less average voltage and therefore rotates more slowly.

---

## Why Use PWM Instead of a Resistor?

Resistor control wastes energy as heat.

PWM control is much more efficient because the MOSFET is either fully ON or fully OFF, minimising power loss.

---

## Why Is a Flyback Diode Needed?

Motors are inductive loads.

When current is interrupted, a high voltage spike can occur.

The flyback diode provides a path for this spike, protecting the controller, MOSFET, and other electronics.

---

## Circuit Diagram

```text
Battery (+)
    │
  Motor
    │──── Flyback diode (cathode toward Battery+, anode toward Drain)
    │
  Drain (MOSFET IRLZ44N)
  Source
    │
   GND

PWM Output (ESP32 GPIO18)
      │
    220 Ω gate resistor
      │
    Gate
```

---

## Simulink Simulation

Before building the circuit, build a Simulink model to predict the first-order step response shape for different time constants. This builds intuition for what you will observe on the motor in Experiment 4.

This model is signal-only — the motor is represented as a transfer function block, not a physical Simscape circuit.

---

### Step 1 — Create a New Simulink Model

1. In MATLAB, go to **Home** tab → click **Simulink**.
2. Click **Blank Model**.
3. Go to **File → Save** and name the file `Motor_First_Order.slx`.

---

### Step 2 — Add Blocks

Open the **Library Browser** and drag the following blocks onto the canvas:

| Block | Library path | Quantity |
|-------|-------------|----------|
| Step | Simulink → Sources | 1 |
| Transfer Fcn | Simulink → Continuous | 1 |
| Scope | Simulink → Sinks | 1 |

---

### Step 3 — Configure the Step Block

Double-click the **Step** block and set:

| Parameter | Value |
|-----------|-------|
| Step time | `0` |
| Initial value | `0` |
| Final value | `1` |

This produces a unit step at t = 0, representing a sudden PWM command to the motor.

---

### Step 4 — Configure the Transfer Fcn Block

Double-click the **Transfer Fcn** block and set:

| Parameter | Value |
|-----------|-------|
| Numerator coefficients | `[1]` |
| Denominator coefficients | `[0.5, 1]` |

This represents $G(s) = \frac{1}{0.5s + 1}$, a first-order system with $\tau = 0.5$ s and $K = 1$.

---

### Step 5 — Wire the Model

Connect:

```text
Step → Transfer Fcn → Scope
```

---

### Step 6 — Simulation Settings

Go to **Modeling → Model Settings** (or press **Ctrl+E**).

Under **Solver**:

| Setting | Value |
|---------|-------|
| Stop time | `5` |
| Type | Variable-step |
| Solver | `ode45` |

Click **OK**.

---

### Step 7 — Run and Observe

Click **Run**. Open the Scope.

You should see the output rise from 0 and settle toward 1, following an exponential curve. At $t = 0.5$ s (one time constant) the output should reach approximately 0.632.

---

### Step 8 — Vary the Time Constant

Change the denominator of the Transfer Fcn to explore how $\tau$ affects the response speed:

| Denominator | $\tau$ | Response |
|-------------|--------|----------|
| `[0.2, 1]` | 0.2 s | Fast — settles quickly |
| `[0.5, 1]` | 0.5 s | Medium |
| `[1.0, 1]` | 1.0 s | Slow |
| `[2.0, 1]` | 2.0 s | Very slow — takes ~10 s to settle |

For each run, note the time at which the output crosses 0.632 — this is always equal to $\tau$.

---

### Wiring Checklist

✅ Step block output connected to Transfer Fcn input

✅ Transfer Fcn output connected to Scope

✅ Step time = 0, Final value = 1

✅ Stop time = 5, Solver = ode45

---

### Prediction Table

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Predicted value</th></tr></thead>
  <tbody>
    <tr><td>Motor time constant τ (s)</td><td><input class="result-input" id="lab08-sim-tau" placeholder="s"></td></tr>
    <tr><td>Speed at 1τ (% of max)</td><td>63.2%</td></tr>
    <tr><td>Approximate settling time (5τ)</td><td><input class="result-input" id="lab08-sim-settle" placeholder="s"></td></tr>
  </tbody>
</table>
</div>

---

## Required Components

- ESP32 DevKit V1
- Breadboard and jumper wires
- IRLZ44N MOSFET
- DC Motor
- Flyback Diode (1N4001–1N4007)
- 220 Ω gate resistor
- External Battery Pack
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Experiment 1 - Full-Speed Motor Control

### Objective

Turn the motor fully ON and OFF and observe the gradual speed response.

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 2   │ [●]   [ ]   [ ]   [ ]   [ ]       │ ← Battery (+) → a2
 3   │ [ ]   [ ]   [ ]   [●]   [ ]       │ ← MOSFET Gate d3
 4   │ [ ]   [┐]   [ ]   [●]   [ ]       │ ← Gate res top b4, MOSFET Drain d4
 5   │ [●]   [┘]   [ ]   [●]   [ ]       │ ← GPIO18 → a5, Gate res bottom b5 (jumper b5→d3), MOSFET Source d5
 6   │ [●]   [ ]   [ ]   [ ]   [ ]       │ ← GND → a6 (jumper a6→d5 for MOSFET Source; also battery −)
 7   │ [ ]   [ ]   [M1]  [ ]   [ ]       │ ← Motor terminal 1 at c7 = MOSFET Drain row (jumper c7→d4)
 8   │ [ ]   [ ]   [M2]  [ ]   [ ]       │ ← Motor terminal 2 at c8 = Battery (+) row (jumper c8→a2)
 9   │ [ ]   [ ]   [A]   [ ]   [ ]       │ ← Flyback diode anode c9 = Motor terminal 1 row (jumper c9→c7)
10   │ [ ]   [ ]   [K]   [ ]   [ ]       │ ← Flyback diode cathode c10 = Battery (+) row (jumper c10→a2)
     └─────────────────────────────────────┘
```

`[M1]`/`[M2]` = motor terminals (either orientation). `[A]` = diode anode; `[K]` = diode cathode (banded end).

Row connections:
- Row 4: gate resistor top and MOSFET Drain — connect with a jumper to the motor terminal 1 row
- Row 2: battery positive rail — connects to motor terminal 2 and flyback diode cathode
- Row 6: shared GND — ESP32 GND, battery negative, and MOSFET Source all meet here

---

### Step-by-Step Wiring

1. Insert the **IRLZ44N MOSFET**: **Gate** at **row 3, col d**, **Drain** at **row 4, col d**, **Source** at **row 5, col d**. Verify G-D-S order from the pinout (Project 04).
2. Connect a jumper wire from **ESP32 GND** to **row 6, col a**. Connect **row 6, col a** to **row 5, col d** (MOSFET Source). Connect **battery negative** to **row 6, col a** as well.
3. Insert the **220 Ω gate resistor**: one leg in **row 4, col b**, other in **row 5, col b**. Connect **row 5, col b** to **row 3, col d** (MOSFET Gate) with a short jumper.
4. Connect a jumper wire from **ESP32 GPIO18** to **row 5, col a**.
5. Connect **motor terminal 1** to **row 7, col c**. Connect **row 7, col c** to **row 4, col d** (MOSFET Drain) with a jumper.
6. Connect **motor terminal 2** to **row 8, col c**. Connect **row 8, col c** to **row 2, col a** (battery positive) with a jumper.
7. Insert the **flyback diode**: **anode** (unmarked end) in **row 9, col c**, **cathode** (banded end) in **row 10, col c**. Connect **row 9** to motor terminal 1 row and **row 10** to battery positive row with short jumpers.

The current path when the MOSFET is ON:

```text
Battery (+) → Motor → Drain → Source → GND → Battery (−)
```

---

### Wiring Checklist

Before uploading:

✅ MOSFET Source connected to GND (shared with battery negative)

✅ Motor connected between battery positive and MOSFET Drain

✅ Flyback diode across motor (cathode toward battery+, anode toward Drain)

✅ Gate resistor between GPIO18 and MOSFET Gate

✅ Battery connected

---

### ESP32 Code

```cpp
void setup()
{
    // Configure GPIO18 as a digital output.
    // Note: ESP32 outputs 3.3 V HIGH, sufficient for the IRLZ44N.
    pinMode(18, OUTPUT);
}

void loop()
{
    // Drive gate HIGH → MOSFET ON → motor runs at full speed.
    digitalWrite(18, HIGH);
    delay(3000);              // Run for 3 seconds

    // Drive gate LOW → MOSFET OFF → motor decelerates.
    digitalWrite(18, LOW);
    delay(3000);              // Stop for 3 seconds
}
```

> **Arduino Uno:** replace GPIO18 with pin 9 and use `pinMode(9, OUTPUT)` / `digitalWrite(9, ...)`.

---

### Observe

Notice:

- Motor accelerates gradually when switched ON.
- Motor decelerates gradually when switched OFF.

Unlike an LED, the response is not instantaneous.

<div class="result-block">
  <label><strong>Why does speed increase slowly?</strong></label>
  <textarea class="result-textarea" id="lab08-exp1-obs-accel" placeholder="Your explanation..."></textarea>
  <label><strong>Why does speed decrease slowly?</strong></label>
  <textarea class="result-textarea" id="lab08-exp1-obs-decel" placeholder="Your explanation..."></textarea>
</div>

---

## Experiment 2 - PWM Speed Control

### Objective

Control motor speed using PWM and observe the gate waveform on the oscilloscope.

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
    ledcAttachPin(18, 0);
}

void loop()
{
    // Set duty cycle to 128/255 ≈ 50%.
    ledcWrite(0, 128);
}
```

> **Arduino Uno:** replace `ledcWrite(0, 128)` with `analogWrite(9, 128)` on pin 9.

---

### Oscilloscope Settings — Gate Signal

1. Hook the **CH1 probe tip** to the **MOSFET Gate**.
2. Clip the **CH1 probe ground** to any **GND pin** on the ESP32 (= MOSFET Source).

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

The motor should rotate at a lower speed than full power.

---

### Measurements

<div class="result-block">
<table>
  <thead><tr><th>Measurement</th><th>Expected</th><th>Measured</th></tr></thead>
  <tbody>
    <tr><td>Frequency</td><td>~500 Hz</td><td><input class="result-input" id="lab08-exp2-freq" placeholder="Hz"></td></tr>
    <tr><td>Gate Voltage</td><td>~3.3 V</td><td><input class="result-input" id="lab08-exp2-vgate" placeholder="V"></td></tr>
    <tr><td>Duty Cycle</td><td>~50%</td><td><input class="result-input" id="lab08-exp2-duty" placeholder="%"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 3 - Speed Versus Duty Cycle

### Objective

Investigate the relationship between PWM duty cycle and motor speed.

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
    ledcWrite(0, 64);    // ~25% → low speed
    delay(3000);

    ledcWrite(0, 128);   // ~50% → medium speed
    delay(3000);

    ledcWrite(0, 192);   // ~75% → high speed
    delay(3000);

    ledcWrite(0, 255);   // 100% → maximum speed
    delay(3000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin 9.

---

### Results Table

<div class="result-block">
<table>
  <thead><tr><th>PWM Value</th><th>Duty Cycle</th><th>Relative Speed</th></tr></thead>
  <tbody>
    <tr><td>64</td><td>25%</td><td><input class="result-input" id="lab08-exp3-spd25" placeholder="e.g. Slow"></td></tr>
    <tr><td>128</td><td>50%</td><td><input class="result-input" id="lab08-exp3-spd50" placeholder="e.g. Medium"></td></tr>
    <tr><td>192</td><td>75%</td><td><input class="result-input" id="lab08-exp3-spd75" placeholder="e.g. Fast"></td></tr>
    <tr><td>255</td><td>100%</td><td><input class="result-input" id="lab08-exp3-spd100" placeholder="e.g. Maximum"></td></tr>
  </tbody>
</table>
</div>

---

## Experiment 4 - Motor Step Response

### Objective

Observe the motor's first-order dynamic response to a step change in PWM, and estimate the motor time constant.

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
    ledcWrite(0, 255);   // Step to full speed
    delay(5000);

    ledcWrite(0, 0);     // Step to zero
    delay(5000);
}
```

> **Arduino Uno:** replace `ledcWrite(0, value)` with `analogWrite(9, value)` on pin 9.

---

### Observe

The motor speed should respond like:

```text
Speed

100% |          ________
     |        /
     |      /
     |    /
     |  /
0%  +---------------------
           Time
```

---

### Estimating the Time Constant

Observe the motor start and estimate the time required to reach approximately 63.2% of final speed.

This estimated time is approximately $\tau$, the motor time constant.

---

### Record Your Model Parameters

<div class="result-block">
<table>
  <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>Estimated τ (s)</td><td><input class="result-input" id="lab08-exp4-tau" placeholder="s"></td></tr>
    <tr><td>Gain K</td><td>1 (normalised)</td></tr>
    <tr><td>Transfer function G(s)</td><td>K / (τs + 1)</td></tr>
  </tbody>
</table>
</div>

> Keep this table. Projects 11, 12, 13 and 14 will use this motor model as the plant for System Identification and P, PI and PID controller design.

---

## MATLAB Comparison

Fit your measured step response to the first-order model using the time constant you estimated in Experiment 4.

```matlab
K            = 1;
tau_measured = 0.5;      % replace with your estimated tau (s)

t = 0:0.01:5 * tau_measured * 3;

tau_theory_low  = tau_measured * 0.7;
tau_theory_high = tau_measured * 1.3;

G_low  = tf(K, [tau_theory_low,  1]);
G_mid  = tf(K, [tau_measured,    1]);
G_high = tf(K, [tau_theory_high, 1]);

[y_low,  ~] = step(G_low,  t);
[y_mid,  ~] = step(G_mid,  t);
[y_high, ~] = step(G_high, t);

figure; hold on;
plot(t, y_low,  'b--', 'LineWidth', 1.5, 'DisplayName', ...
    sprintf('\\tau = %.2fs (low)', tau_theory_low));
plot(t, y_mid,  'r',   'LineWidth', 2.5, 'DisplayName', ...
    sprintf('\\tau = %.2fs (measured)', tau_measured));
plot(t, y_high, 'b--', 'LineWidth', 1.5, 'DisplayName', ...
    sprintf('\\tau = %.2fs (high)', tau_theory_high));
yline(0.632, 'k:', '63.2% threshold');
xline(tau_measured, 'r:', sprintf('\\tau = %.2fs', tau_measured));
grid on;
xlabel('Time (s)'); ylabel('Normalised Speed');
title('First-Order Motor Model - Measured \tau Fit');
legend('Location', 'southeast');
```

### Reflection

- Does the simulated curve match the shape you observed on the motor?
- What physical factors determine the motor time constant?
- How would a heavier load (more inertia) change τ?

---

## Troubleshooting

### Motor Doesn't Spin

Check:

✅ Battery connected and charged

✅ MOSFET pinout correct (G, D, S identified)

✅ Shared GND between ESP32 and battery negative

✅ Gate resistor connected between GPIO18 and Gate

---

### Controller Resets

Check:

✅ Flyback diode installed across motor terminals

✅ Shared power supply issues (use separate battery for motor)

---

### MOSFET Gets Hot

Check:

✅ Logic-level MOSFET (IRLZ44N, not IRFZ44N)

✅ Motor current within MOSFET rating

---

### PWM Not Visible

Check:

✅ Probe tip on MOSFET Gate

✅ Probe ground on ESP32 GND (= MOSFET Source)

✅ Trigger type set to Edge, Rising

✅ Horizontal scale appropriate (500 µs/div for ~500 Hz)

---

### Troubleshooting Checklist

✅ Flyback diode installed

✅ Battery connected

✅ MOSFET pinout verified

✅ Shared ground between controller and motor supply

✅ PWM observed on oscilloscope

---

## Knowledge Check

### Question 1

Why can't a motor reach full speed instantly?

---

### Question 2

What controls motor speed in this experiment?

---

### Question 3

Why is a flyback diode required?

---

### Question 4

Why is a MOSFET used instead of connecting the motor directly to the controller pin?

---

### Question 5

Why can a motor often be modelled as a first-order system?

---

### Question 6

You estimated τ = 0.5 s from the step response. How would you verify this estimate, and why does an accurate τ matter for designing the controller in Project 12?

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="lab08">⬇ Export Results (JSON)</button>
  <button class="result-clear-btn" data-lab="lab08">✕ Clear All Results</button>
</div>

---

## Project Summary

In this project you learned:

✅ DC motor fundamentals

✅ PWM speed control

✅ MOSFET motor driving

✅ Flyback diode protection

✅ First-order dynamic behaviour

✅ Motor time constants

✅ Open-loop control

✅ Oscilloscope motor measurements

The motor is the first real plant we will control.

After completing the AC and DC power electronics projects (09–10), feedback control will be introduced in Projects 11–14.

---

## Next Project

```text
09_AC_DC_Rectifiers.md
```

Topics:

- AC and DC Voltages
- Diode Rectification
- Half-Wave Rectifiers
- Bridge Rectifiers
- Capacitor Smoothing
- Ripple Voltage
