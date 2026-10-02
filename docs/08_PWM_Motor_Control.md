# Project 08 - PWM Motor Control and First-Order System Dynamics

---

## Reading Before the Lab

Read _Fundamentals of Power Electronics_ by Erickson and Maksimovic, Chapter 2, **Basic Concepts**, sections on converter applications and motor drives. Then read _Modern Control Engineering_ by Ogata, Chapter 2, **Mathematical Modeling of Control Systems**, and Chapter 5, **Transient and Steady-State Response Analysis**, for first-order models, time constant, rise time, and settling time. Estimate the mechanical time constant from a step response.

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

Instead, speed rises gradually, following a first-order exponential response similar to the RC circuit from Project 02.

---

## First-Order Motor Model

A DC motor can often be approximated by:

$$
G(s) = \frac{K}{\tau s + 1}
$$

Where:

- $K$ = System Gain
- $\tau$ = Motor Time Constant

In this lab, the input is the applied PWM duty cycle (or its averaged voltage) and the output is motor speed. This first-order model is an approximation that neglects switching ripple, electrical transients, delay, saturation, and changes in load torque.

---

## PWM Motor Control

PWM controls the average voltage applied to the motor:

$$
V_{AVG} = D \cdot V_S
$$

For a fixed motor and approximately constant load, reducing duty cycle usually reduces average speed. The relationship is not universally proportional because speed also depends on back-EMF, winding resistance, friction, current, and load torque.

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
5 V current-limited supply (+)
    │
  Motor
    │──── Flyback diode (cathode toward +5 V, anode toward Drain)
    │
  Drain (MOSFET AO3400A)
  Source
    │
   GND

PWM Output (ESP32 GPIO18)
      │
    100 Ω gate resistor
      │
    Gate

Optical tachometer (3.3 V output) → ESP32 GPIO27 and oscilloscope CH2
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
- AO3400A N-channel MOSFET on a labeled breakout board; $R_{DS(on)}$ specified at $V_{GS}=2.5$ V
- 3–6 V brushed gearmotor, suitable at 5 V, with datasheet stall current no greater than 300 mA
- 1N5819 Schottky flyback diode, rated at least 1 A and 20 V
- 100 Ω gate resistor and 100 kΩ gate-to-source pull-down
- Optical reflective tachometer: TCRT5000 phototransistor, 150 Ω IR LED resistor, 10 kΩ output pull-up to 3.3 V, and a 12-mark reflective encoder wheel
- Isolated 0–30 V, 0–3 A bench supply with CC mode and output enable; set to 5.0 V and 0.35 A maximum for this motor
- OWON HDS272S Oscilloscope (recommended)
- Two 10:1 probes or one probe plus the ESP32 serial plotter

Do not power the motor from the ESP32. Connect the motor-supply negative, ESP32 GND, and tachometer GND together. Power the tachometer LED and its output pull-up from ESP32 3.3 V only. Confirm the selected motor's stall-current rating before connecting it; do not stall it during testing.

---

## Experiment 1 - Full-Speed Motor Control

### Objective

Turn the motor fully ON and OFF and observe the gradual speed response.

### Wiring (Node List)

Wire with both supplies off:

```text
Motor supply +5 V → motor terminal A and flyback-diode cathode
Motor terminal B → Q1 AO3400A drain
Q1 source → motor-supply negative / circuit GND
1N5819 flyback diode across motor: cathode to +5 V, anode to motor terminal B
ESP32 GPIO18 → 100 Ω → Q1 gate; 100 kΩ from gate to source
Motor-supply negative → ESP32 GND
TCRT5000 IR LED: ESP32 3.3 V → 150 Ω → LED anode; LED cathode → GND
TCRT5000 phototransistor emitter → GND; collector → GPIO27 and 10 kΩ pull-up to 3.3 V
``` 

Attach the 12-mark reflective wheel to the motor shaft and secure the sensor so its output toggles once per mark. Verify the tachometer output never exceeds 3.3 V. Do not use a 5 V-powered comparator module unless its output is level-shifted to 3.3 V.

Set the bench supply to 5.0 V and 0.35 A maximum. If the chosen motor's rated stall current exceeds 300 mA, do not use it with this setup; choose a smaller motor instead. The current limit is protection, not a substitute for checking the motor rating.

<!-- Retired battery/IRLZ44N breadboard layout and wiring instructions follow; do not use them.

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 1   │ [●]   [┐]   [ ]   [ ]   [ ]       │ ← GPIO18 → a1, gate resistor top b1
 2   │ [●]   [ ]   [ ]   [ ]   [ ]       │ ← Battery (+) → a2
 3   │ [ ]   [┘]   [ ]   [●]   [ ]       │ ← Gate resistor bottom b3 = MOSFET Gate d3
 4   │ [ ]   [ ]   [ ]   [●]   [ ]       │ ← MOSFET Drain d4
 5   │ [ ]   [ ]   [ ]   [●]   [ ]       │ ← MOSFET Source d5 (no GPIO connection on this row)
 6   │ [●]   [ ]   [ ]   [ ]   [ ]       │ ← GND → a6 (jumper a6→d5 for MOSFET Source; also battery −)
 7   │ [ ]   [ ]   [M1]  [ ]   [ ]       │ ← Motor terminal 1 at c7 = MOSFET Drain row (jumper c7→d4)
 8   │ [ ]   [ ]   [M2]  [ ]   [ ]       │ ← Motor terminal 2 at c8 = Battery (+) row (jumper c8→a2)
 9   │ [ ]   [ ]   [A]   [ ]   [ ]       │ ← Flyback diode anode c9 = Motor terminal 1 row (jumper c9→c7)
10   │ [ ]   [ ]   [K]   [ ]   [ ]       │ ← Flyback diode cathode c10 = Battery (+) row (jumper c10→a2)
     └─────────────────────────────────────┘
```

`[M1]`/`[M2]` = motor terminals (either orientation). `[A]` = diode anode; `[K]` = diode cathode (banded end).

Row connections:
- Row 1: GPIO18 and gate-resistor top
- Row 3: gate-resistor bottom and MOSFET Gate
- Row 4: MOSFET Drain — connect with a jumper to the motor terminal 1 row
- Row 2: battery positive rail — connects to motor terminal 2 and flyback diode cathode
- Row 6: shared GND — ESP32 GND, battery negative, and MOSFET Source meet through a jumper from row 5

---

### Step-by-Step Wiring

1. Insert the **IRLZ44N MOSFET**: **Gate** at **row 3, col d**, **Drain** at **row 4, col d**, **Source** at **row 5, col d**. Verify G-D-S order from the pinout (Project 04).
2. Connect a jumper wire from **ESP32 GND** to **row 6, col a**. Connect **row 6, col a** to **row 5, col d** (MOSFET Source). Connect **battery negative** to **row 6, col a** as well.
3. Insert the **220 Ω gate resistor** between **row 1, col b** and **row 3, col b**. Row 3 is the MOSFET Gate row; row 1 is isolated from the MOSFET Source and Drain rows.
4. Connect **ESP32 GPIO18** to **row 1, col a**, the same electrical row as the gate-resistor top.
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
-->

---

### ESP32 Code

```cpp
void setup()
{
    // Configure GPIO18 as a digital output.
    // Confirm the selected MOSFET's gate-drive rating before use.
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
const int pwmPin = 18;
const int tachPin = 27;
const uint32_t marksPerRevolution = 12;

volatile uint32_t pulseCount = 0;
uint32_t lastReportMs = 0;
uint32_t lastStepMs = 0;
bool motorOn = true;

void IRAM_ATTR countTachPulse()
{
  pulseCount++;
}

void setup()
{
    ledcSetup(0, 500, 8);
  ledcAttachPin(pwmPin, 0);
  pinMode(tachPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(tachPin), countTachPulse, FALLING);
  Serial.begin(115200);
}

void loop()
{
  uint32_t now = millis();
  if (now - lastStepMs >= 5000) {
    motorOn = !motorOn;
    lastStepMs = now;
  }
  int pwmValue = motorOn ? 255 : 0;
  ledcWrite(0, pwmValue);

  if (now - lastReportMs >= 100) {
    noInterrupts();
    uint32_t pulses = pulseCount;
    pulseCount = 0;
    interrupts();

    float rpm = pulses * 60000.0 / (marksPerRevolution * (now - lastReportMs));
    Serial.print(now);
    Serial.print(',');
    Serial.print(pwmValue);
    Serial.print(',');
    Serial.println(rpm, 1);
    lastReportMs = now;
  }
}
```

The serial columns are elapsed milliseconds, PWM command, and measured RPM. Use the Serial Plotter or export the data to MATLAB. Each falling edge represents one of the wheel's 12 reflective marks.

---

### Observe

The measured RPM should respond like:

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

Plot RPM against time for the first 5-second ON step. Estimate steady speed from the final part of the interval, then estimate $\tau$ as the time to reach 63.2% of that speed.

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

Save the Serial Monitor CSV lines to `rpm_step.csv` with columns `elapsed_ms,pwm,rpm`, then run this script. It estimates $\tau$ from the first 5-second ON step using the 63.2% rise-time definition.

```matlab
data = readmatrix('rpm_step.csv');
time_s = data(:,1) / 1000;
pwm = data(:,2);
rpm = data(:,3);

onStart = find(pwm == 255, 1, 'first');
offAfter = find(pwm(onStart:end) == 0, 1, 'first');
if isempty(offAfter)
  onEnd = numel(pwm);
else
  onEnd = onStart + offAfter - 2;
end
onIdx = onStart:onEnd;
t = time_s(onIdx) - time_s(onIdx(1));
steadyIdx = onIdx(max(1, numel(onIdx)-9):end);
rpmFinal = mean(rpm(steadyIdx));
speedNorm = rpm(onIdx) / rpmFinal;

tauIndex = find(speedNorm >= 0.632, 1, 'first');
tauMeasured = t(tauIndex);
fprintf('Estimated time constant: %.3f s\\n', tauMeasured);

figure;
plot(t, speedNorm, 'o', 'DisplayName', 'Measured RPM');
hold on;
plot(t, 1 - exp(-t/tauMeasured), '-', 'DisplayName', 'First-order fit');
yline(0.632, 'k:', '63.2% threshold');
xline(tauMeasured, 'r:', sprintf('\\tau = %.2f s', tauMeasured));
grid on;
xlabel('Time from PWM step (s)');
ylabel('Normalised speed');
title('Measured Motor Step Response');
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

✅ Bench supply enabled at 5.0 V and motor current below the 0.35 A limit

✅ MOSFET pinout correct (G, D, S identified)

✅ Shared GND between ESP32 and motor-supply negative

✅ Gate resistor connected between GPIO18 and Gate

---

### Controller Resets

Check:

✅ Flyback diode installed across motor terminals

✅ ESP32 USB supply and motor bench supply are separate; only their grounds are joined

---

### MOSFET Gets Hot

Check:

✅ MOSFET $R_{DS(on)}$ specified at the actual gate voltage, or a suitable gate driver installed

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

✅ Bench supply set to 5.0 V with current limit no higher than 0.35 A

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
