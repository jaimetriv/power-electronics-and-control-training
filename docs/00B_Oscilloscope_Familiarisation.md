# Project 00B - Oscilloscope Familiarisation

---

## Objective

The objective of this project is to become familiar with the OWON HDS272S oscilloscope and to learn how to use it to measure and analyse electrical signals.

This project introduces the basic oscilloscope skills required for the remainder of the course, including:

- Connecting the oscilloscope safely
- Adjusting the vertical (voltage) scale
- Adjusting the horizontal (time) scale
- Using the trigger system
- Measuring DC voltage
- Measuring PWM waveforms
- Measuring frequency and period

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Connect the OWON HDS272S safely to a circuit

✅ Adjust the vertical scale to suit the signal

✅ Adjust the horizontal scale to suit the signal

✅ Use edge triggering to stabilise a waveform

✅ Measure DC voltage

✅ Measure peak voltage of a PWM signal

✅ Measure the period and frequency of a PWM signal

✅ Identify duty cycle from a waveform

✅ Use the built-in signal generator  

✅ Measure input and output signals simultaneously  

✅ Observe the behaviour of a simple low-pass filter  

✅ Measure signal attenuation as frequency changes  

✅ Prepare the oscilloscope for future experiments

---

## What Is An Oscilloscope?

An oscilloscope displays how voltage changes over time:

```text
Voltage
   ^
   |  ___       ___
   | |   |     |   |
   | |   |     |   |
   +-+---+-----+---+-----> Time
```

Unlike a multimeter, which shows a single number, an oscilloscope shows the complete shape of a signal.

---

## Why Oscilloscopes Are Important

A multimeter can tell you:

```text
Voltage = 2.5 V
```

but it cannot tell you:

- Frequency
- Duty cycle
- Waveform shape
- Ringing or oscillation
- Ripple voltage
- Transient response

An oscilloscope can show all of these.

Throughout this course the oscilloscope will be used to:

- Verify PWM signals
- Observe RC and RLC circuit responses
- Measure MOSFET switching behaviour
- Inspect converter switch-node waveforms
- Validate closed-loop control responses

---

## About The OWON HDS272S

The OWON HDS272S is a handheld digital oscilloscope, multimeter, and signal generator combined in a single instrument.

```text
 ┌─────────────────────┐
 │  OWON HDS272S       │
 │                     │
 │  [  Display  ]      │
 │                     │
 │  CH1  CH2           │
 │  [Menu] [Trigger]   │
 │  [Scale] [Position] │
 │                     │
 │  CH1 ──●  CH2 ──●   │
 └─────────────────────┘
```

Key features relevant to this course:
- Two input channels
- Automatic measurements (frequency, period, duty cycle, Vpp)
- Edge triggering with adjustable level
- DC and AC coupling
- Built-in multimeter
- Built-in signal generator (sine, square, triangle, sawtooth waveforms)

The built-in signal generator can be used together with the oscilloscope channels to investigate how circuits respond to different signals.

Throughout this course the signal generator will be used to inject known waveforms into circuits while simultaneously measuring both the input and output signals.

---

## About The Signal Generator

The OWON HDS272S includes a built-in signal generator accessible from the instrument menu.

The signal generator can output:

- Sine wave
- Square wave
- Triangle wave
- Sawtooth wave

Frequency and amplitude are adjustable. The output is available on the dedicated generator terminal on the instrument.

The signal generator will be used in later projects to provide a known test signal without needing an Arduino, for example when characterising RC and RLC circuit responses.

The signal generator outputs one waveform at a time. Although it cannot generate multiple frequencies simultaneously, it can easily be adjusted to test different frequencies manually.

This capability allows simple frequency-response experiments to be performed by observing how a circuit behaves as the signal frequency is changed.

---

## About The DSO Nano V3

The DSO Nano V3 is a compact single-channel fallback option.

All experiments in this project can be completed with either instrument. Where settings differ, both are noted.

---

## Understanding The Screen

The oscilloscope screen is a grid of squares called divisions:

```text
+------+------+------+------+------+
|      |      |      |      |      |
+------+------+------+------+------+
|      |      |   *  |      |      |
+------+------+--*---+------+------+
|      |      | *    |      |      |
+------+------+*-----+------+------+
|      |     *|      |      |      |
+------+----*-+------+------+------+
|      |  *   |      |      |      |
+------+------+------+------+------+
```

The vertical axis represents:

```text
Voltage
```

The horizontal axis represents:

```text
Time
```

---

## Vertical Scale

The vertical scale sets how many volts each division represents:

```text
Volts per Division (V/div)
```

Common settings:

```text
5 V/div
2 V/div
1 V/div
500 mV/div
200 mV/div
```

---

## Vertical Scale Example

If the vertical scale is set to:

```text
1 V/div
```

and the waveform spans 5 divisions from bottom to top, then:

$$
V_{peak} = 5 \times 1 = 5 \text{ V}
$$

---

## Horizontal Scale

The horizontal scale sets how much time each division represents:

```text
Time per Division (s/div, ms/div, us/div)
```

Common settings:

```text
1 s/div
100 ms/div
10 ms/div
1 ms/div
500 us/div
100 us/div
```

---

## Horizontal Scale Example

If the horizontal scale is set to:

```text
1 ms/div
```

and one complete cycle spans 2 divisions, then:

$$
T = 2 \times 1 \text{ ms} = 2 \text{ ms}
$$

---

## Frequency and Period

Frequency and period are related by:

$$
f = \frac{1}{T}
$$

If:

$$
T = 2 \text{ ms} = 0.002 \text{ s}
$$

then:

$$
f = \frac{1}{0.002} = 500 \text{ Hz}
$$

---

## Triggering

Without triggering the waveform scrolls continuously across the screen and is difficult to read.

Triggering tells the oscilloscope:

```text
Start drawing the waveform when the signal crosses
a defined voltage level in a defined direction.
```

With triggering enabled the waveform appears stable and stationary.

---

## Trigger Settings

For almost every experiment in this course use:

```text
Trigger Type:  Edge
Trigger Edge:  Rising
```

The trigger level should be set to approximately half the signal amplitude.

---

## Safe Oscilloscope Connections

For all Arduino and ESP32 experiments:

Always connect the probe ground clip to:

```text
Arduino GND  (or ESP32 GND)
```

Never connect the ground clip to a live signal or to a floating point.

```text
Probe Tip   ──────► Signal point to measure
Probe GND   ──────► Arduino GND
```

---

## How to Connect the Oscilloscope Probe

Before every experiment, connect the probe in this order:

### Step 1 — BNC Connector

Insert the BNC connector (the thick end of the probe cable) into the **CH1** input socket on the OWON HDS272S.

Align the two bayonet pins with the slots, push in firmly, and rotate a quarter-turn clockwise until you feel a click.

### Step 2 — Ground Clip

Clip the short lead with the **black alligator clip** to any **GND pin** on the Arduino.

> The oscilloscope ground and the probe ground are connected through the instrument chassis. Connecting the ground clip to any point other than GND will short that point to ground and can damage your circuit.

### Step 3 — Probe Tip

Touch the retractable metal hook at the tip to the signal you want to measure.

To hook onto an Arduino pin, retract the protective tip cover to expose the hook and hook it directly over the header pin.

```text
OWON CH1 socket  ◄──── BNC connector (push and twist)
Arduino GND pin  ◄──── Ground clip (black alligator clip)
Signal pin       ◄──── Probe tip (metal hook)
```

> Once the ground clip is attached to GND you can safely move the probe tip between any pins without disconnecting anything.

---

## Experiment 1 - Ground Verification

### Objective

Confirm the oscilloscope is working correctly before connecting it to any circuit.

---

### Procedure

1. Power on the OWON HDS272S.
2. Connect the CH1 probe tip to the CH1 probe ground clip (short them together).
3. Set the vertical scale to **1 V/div**.
4. Set the horizontal scale to **1 ms/div**.
5. Observe the display.

---

### Expected Result

You should see a flat horizontal line at the centre of the screen:

```text
-----------------------------------------
```

This confirms the oscilloscope is reading 0 V correctly.

If the line is not flat or not at zero, use the vertical position control to centre it.

---

## Experiment 2 - Measure a DC Voltage

### Objective

Measure a constant 5 V DC signal from the Arduino and confirm the oscilloscope reads the correct value.

---

### Arduino Code

```cpp
void setup()
{
    // Configure pin 9 as a digital output.
    pinMode(9, OUTPUT);

    // Set pin 9 permanently HIGH (5 V DC).
    // This gives a constant voltage for the oscilloscope to measure.
    digitalWrite(9, HIGH);
}

void loop()
{
    // Nothing needed here; the pin stays HIGH indefinitely.
}
```

---

### Connections

1. Insert the CH1 probe BNC connector into **CH1** on the OWON HDS272S and twist to lock.
2. Clip the **ground clip** to any **GND pin** on the Arduino.
3. Hook the **probe tip** onto **Arduino pin D9**.

```text
CH1 socket    ◄──── BNC connector
Arduino GND   ◄──── Ground clip
Arduino D9    ◄──── Probe tip
```

> You are measuring the voltage on D9 relative to GND. D9 is set permanently HIGH by the code, so you expect to see a flat 5 V line.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano V3 |
|---------|--------------|-------------|
| Channel | CH1 | CH1 |
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 100 ms/div | 100 ms/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Result

You should see a flat horizontal line approximately 2.5 divisions above the centre line:

```text
___________________________________________   ← 5 V line (2.5 div above centre at 2 V/div)


- - - - - - - - - - - - - - - - - - - - - -  ← 0 V (centre)
```

The measured voltage should be approximately:

$$
V \approx 5 \text{ V}
$$

---

### Probe Attenuation Note

Check that the probe attenuation setting on the oscilloscope matches the switch on the probe body.

- If the probe switch is set to **x1**, set the oscilloscope to **x1**.
- If the probe switch is set to **x10**, set the oscilloscope to **x10**.

A mismatch will cause the displayed voltage to be 10 times too high or too low.

---

### Record Measurements

<div class="result-block">
  <label>DC Voltage (V)</label>
  <input type="text" id="lab00B-exp2-voltage" class="result-input" placeholder="Expected: 5 V" data-lab="00B">
</div>

---

## Experiment 3 - Observe a PWM Signal

### Objective

Observe a PWM waveform and measure its peak voltage, period, and frequency.

---

### Arduino Code

```cpp
void setup()
{
    // No explicit pinMode needed; analogWrite() configures the pin automatically.
}

void loop()
{
    // Output a PWM signal on pin 9 with a duty cycle of approximately 50%.
    // analogWrite() accepts values from 0 (0%) to 255 (100%).
    // Value 128 gives approximately 50% duty cycle.
    analogWrite(9, 128);
}
```

---

### Connections

Same physical connections as Experiment 2:

1. BNC connector into **CH1** on the OWON HDS272S.
2. Ground clip onto any **Arduino GND pin**.
3. Probe tip onto **Arduino pin D9**.

```text
CH1 socket    ◄──── BNC connector
Arduino GND   ◄──── Ground clip
Arduino D9    ◄──── Probe tip
```

> The horizontal scale is much shorter here (500 µs/div vs 100 ms/div in Experiment 2) because the PWM switching period is about 2 ms, which is invisible at 100 ms/div.

---

### Oscilloscope Settings

| Setting | OWON HDS272S | DSO Nano V3 |
|---------|--------------|-------------|
| Channel | CH1 | CH1 |
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 us/div | 500 us/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Expected Waveform

```text
5V  ─────      ─────      ─────
         │    │     │    │
         │    │     │    │
0V  _____│____│_____│____│_____
```

The signal switches between 0 V and 5 V at approximately 490 Hz.

At 50% duty cycle the ON time and OFF time are approximately equal.

---

### Measurements

Measure the following from the waveform:

#### Peak Voltage

Count the number of vertical divisions from the 0 V baseline to the top of the waveform and multiply by the V/div setting.

Expected:

$$
V_{peak} \approx 5 \text{ V}
$$

---

#### Period

Count the number of horizontal divisions for one complete cycle (from one rising edge to the next) and multiply by the time/div setting.

Expected:

$$
T \approx 2 \text{ ms}
$$

---

#### Frequency

Calculate from the measured period:

$$
f = \frac{1}{T} \approx \frac{1}{0.002} = 500 \text{ Hz}
$$

The actual Arduino Uno PWM frequency on pin 9 is approximately 490 Hz. Small variation is normal.

---

#### Duty Cycle

Measure the ON time (HIGH portion) and divide by the total period:

$$
D = \frac{t_{ON}}{T} \approx 50\%
$$

---

### Measurement Worksheet

<div class="result-block">
  <label>Peak Voltage (V)</label>
  <input type="text" id="lab00B-exp3-vpeak" class="result-input" placeholder="Expected: 5 V" data-lab="00B">
</div>
<div class="result-block">
  <label>Period (ms)</label>
  <input type="text" id="lab00B-exp3-period" class="result-input" placeholder="Expected: 2 ms" data-lab="00B">
</div>
<div class="result-block">
  <label>Frequency (Hz)</label>
  <input type="text" id="lab00B-exp3-freq" class="result-input" placeholder="Expected: 490 Hz" data-lab="00B">
</div>
<div class="result-block">
  <label>Duty Cycle (%)</label>
  <input type="text" id="lab00B-exp3-duty" class="result-input" placeholder="Expected: 50%" data-lab="00B">
</div>

---

## Experiment 4 - Vary the Duty Cycle

### Objective

Observe how changing the PWM duty cycle changes the waveform shape.

---

### Arduino Code

```cpp
void setup()
{
    Serial.begin(9600);
}

void loop()
{
    // Sweep duty cycle from 0% to 100% in steps.
    // analogWrite() range: 0 (0%) to 255 (100%).
    for (int duty = 0; duty <= 255; duty += 64)
    {
        analogWrite(9, duty);

        // Print the current duty cycle percentage to the Serial Monitor.
        float percent = duty * (100.0 / 255.0);
        Serial.print("Duty cycle: ");
        Serial.print(percent, 1);
        Serial.println("%");

        delay(3000);   // Hold each duty cycle for 3 seconds to observe on the oscilloscope
    }
}
```

---

### Connections

Same physical connections as Experiments 2 and 3:

1. BNC connector into **CH1** on the OWON HDS272S.
2. Ground clip onto any **Arduino GND pin**.
3. Probe tip onto **Arduino pin D9**.

---

### Procedure

1. Upload the code.
2. Connect the oscilloscope probe as described above.
3. Open the Serial Monitor at **9600 baud** to confirm which duty cycle step is currently active.
4. For each step, observe the waveform and note the ON time versus OFF time ratio.

---

### Expected Observations

| analogWrite Value | Duty Cycle | Waveform |
|-------------------|------------|---------|
| 0 | 0% | Flat LOW (0 V) |
| 64 | 25% | Short ON, long OFF |
| 128 | 50% | Equal ON and OFF |
| 192 | 75% | Long ON, short OFF |
| 255 | 100% | Flat HIGH (5 V) |

---

## Experiment 5 - RC Low-Pass Filter with Signal Generator

### Objective

Observe how an RC low-pass filter attenuates signals as frequency increases.
Learn to configure the OWON HDS272S built-in signal generator and measure
input and output simultaneously with both oscilloscope channels.

---

### Background

An RC low-pass filter passes low frequencies and attenuates high frequencies.
The cutoff (−3 dB) frequency is:

$$
f_c = \frac{1}{2 \pi R C}
$$

For this circuit:

$$
f_c = \frac{1}{2 \pi \times 10000 \times 100 \times 10^{-9}} \approx 159 \text{ Hz}
$$

Below $f_c$ the output amplitude is close to the input.
Above $f_c$ the output is attenuated and phase-shifted.

This concept appears throughout the course in:

- Output ripple filtering in Buck and Boost converters
- L-filter design in inverter output stages
- Bandwidth and phase margin in closed-loop control

---

### About the OWON Signal Generator

The OWON HDS272S generates **one waveform at one frequency at a time**.
It cannot inject multiple frequencies simultaneously.

For this experiment you change the frequency manually between tests.
This is called a **manual frequency sweep** and is the standard technique
for measuring frequency response in a practical lab.

---

### Components Required

- 10 kΩ resistor (from SparkFun kit)
- 100 nF capacitor (from SparkFun Beginner Parts Kit)
- Breadboard
- Jumper wires
- OWON HDS272S
- BNC-to-jumper cable or BNC-to-alligator leads for the generator output

---

### Circuit

```text
         10 kΩ
VIN ─────┤R├─────┬──── VOUT
                 │
               100 nF
                 │
GND ─────────────┴──── GND
```

Output is measured across the capacitor. Cutoff frequency ≈ 159 Hz.

---

### Breadboard Layout

```
       a      b      c      d      e
     ┌─────────────────────────────────────┐
 5   │ [●]   [ ]   [┐]   [ ]   [ ]       │ ← GEN OUT → a5 (VIN), Resistor top c5
 6   │ [ ]   [ ]   [│]   [ ]   [ ]       │
 7   │ [ ]   [ ]   [│]   [ ]   [ ]       │  10 kΩ resistor (c5 to c8)
 8   │ [ ]   [ ]   [┘]   [ ]   [●]       │ ← Resistor bottom c8, Cap top e8 = VOUT
 9   │ [ ]   [ ]   [ ]   [ ]   [│]       │
10   │ [ ]   [ ]   [ ]   [ ]   [│]       │  100 nF capacitor (e8 to e11)
11   │ [ ]   [ ]   [ ]   [ ]   [●]       │ ← Cap bottom e11 → GND rail
     └─────────────────────────────────────┘
```

Row connections (all holes in the same row are internally linked):

- Row 5: `a5` (GEN OUT wire) and `c5` (resistor top) are at **VIN**.
- Row 8: `c8` (resistor bottom) and `e8` (capacitor top) are at **VOUT**.

---

### Signal Generator Setup

Follow these steps on the OWON HDS272S:

1. Press the **[GEN]** button (or navigate **Menu → Generator**) to enter signal generator mode.
2. Select **Waveform → Sine**.
3. Set **Amplitude → 2 Vpp**.
4. Set **Offset → 0 V**.
5. Set **Frequency → 100 Hz** (starting point for Test A).
6. **Enable the output** so the GEN OUT terminal becomes active.
7. The signal appears on the **GEN OUT** BNC terminal on the instrument body.

> Between tests only the frequency changes. Waveform, amplitude, and offset stay fixed.

---

### Important Ground Connection

All ground connections must share the same GND rail on the breadboard:

```text
OWON GEN GND terminal  →  GND rail
CH1 ground clip        →  GND rail
CH2 ground clip        →  GND rail
```

Separate ground loops cause measurement errors.

---

### Step-by-Step Wiring

1. Insert the **10 kΩ resistor** vertically: one leg in **row 5, column c**, other in **row 8, column c**.
2. Insert the **100 nF capacitor** vertically: one leg in **row 8, column e**, other in **row 11, column e**. Ceramic capacitors are not polarised — either leg at top.
3. Connect a jumper from **row 11, column e** to the **GND rail**.
4. Connect the **OWON GEN OUT** terminal to **row 5, column a** using a BNC-to-jumper cable. This is VIN.
5. Connect the **OWON GEN GND** terminal to the **GND rail**.
6. Insert **CH1 probe BNC** into CH1. Clip the CH1 ground to the **GND rail**. Hook the CH1 probe tip to **row 5, column a** (VIN).
7. Insert **CH2 probe BNC** into CH2. Clip the CH2 ground to the **GND rail**. Hook the CH2 probe tip to **row 8, column e** (VOUT, across the capacitor).

### Wiring Checklist

✅ Resistor vertical in column c, rows 5–8

✅ Capacitor vertical in column e, rows 8–11

✅ Cap bottom (row 11, column e) connected to GND rail

✅ GEN OUT connected to row 5, column a (VIN)

✅ GEN GND, CH1 ground clip, CH2 ground clip — all on the same GND rail

✅ CH1 probe tip at row 5 (VIN)

✅ CH2 probe tip at row 8, column e (VOUT)

---

### Oscilloscope Settings

| Setting | Value |
|---------|-------|
| Channels active | CH1 and CH2 |
| CH1 vertical scale | 500 mV/div |
| CH2 vertical scale | 500 mV/div |
| Horizontal scale | Adjust per test — see table below |
| Trigger source | CH1 |
| Trigger type | Edge, Rising |
| Coupling | DC |

Suggested horizontal scale per test:

| Test Frequency | Horizontal Scale |
|----------------|-----------------|
| 100 Hz | 2 ms/div |
| 500 Hz | 500 µs/div |
| 1 kHz | 200 µs/div |
| 10 kHz | 20 µs/div |

---

### Procedure

#### Test A — 100 Hz (below cutoff)

1. Set the OWON signal generator to **100 Hz**.
2. Set horizontal scale to **2 ms/div**.
3. Observe both CH1 and CH2. Use the oscilloscope Vpp auto-measurement or count divisions.

Expected: CH1 ≈ CH2 — little attenuation well below $f_c$.

#### Test B — 500 Hz (near cutoff)

1. Change generator frequency to **500 Hz**.
2. Adjust horizontal scale to **500 µs/div**.
3. Record CH1 and CH2 Vpp.

Expected: CH2 slightly smaller than CH1. A phase shift between the waveforms is also visible.

#### Test C — 1 kHz (above cutoff)

1. Change generator frequency to **1 kHz**.
2. Adjust horizontal scale to **200 µs/div**.
3. Record CH1 and CH2 Vpp.

Expected: Noticeable attenuation — CH2 amplitude clearly smaller than CH1.

#### Test D — 10 kHz (well above cutoff)

1. Change generator frequency to **10 kHz**.
2. Adjust horizontal scale to **20 µs/div**.
3. Record CH1 and CH2 Vpp.

Expected: CH2 significantly smaller than CH1.

---

### Expected Results

| Frequency | Expected observation |
|-----------|---------------------|
| 100 Hz | CH1 ≈ CH2 — signal passes with minimal attenuation |
| 500 Hz | CH2 slightly smaller — near-cutoff region |
| 1 kHz | CH2 noticeably smaller — above cutoff |
| 10 kHz | CH2 much smaller — well above cutoff |

---

### Record Measurements

<div class="result-block">
  <label>100 Hz — CH1 Vpp (V)</label>
  <input type="text" id="lab00B-exp5-ch1-100" class="result-input" placeholder="Input amplitude" data-lab="00B">
</div>
<div class="result-block">
  <label>100 Hz — CH2 Vpp (V)</label>
  <input type="text" id="lab00B-exp5-ch2-100" class="result-input" placeholder="Output amplitude" data-lab="00B">
</div>
<div class="result-block">
  <label>500 Hz — CH1 Vpp (V)</label>
  <input type="text" id="lab00B-exp5-ch1-500" class="result-input" placeholder="Input amplitude" data-lab="00B">
</div>
<div class="result-block">
  <label>500 Hz — CH2 Vpp (V)</label>
  <input type="text" id="lab00B-exp5-ch2-500" class="result-input" placeholder="Output amplitude" data-lab="00B">
</div>
<div class="result-block">
  <label>1 kHz — CH1 Vpp (V)</label>
  <input type="text" id="lab00B-exp5-ch1-1k" class="result-input" placeholder="Input amplitude" data-lab="00B">
</div>
<div class="result-block">
  <label>1 kHz — CH2 Vpp (V)</label>
  <input type="text" id="lab00B-exp5-ch2-1k" class="result-input" placeholder="Output amplitude" data-lab="00B">
</div>
<div class="result-block">
  <label>10 kHz — CH1 Vpp (V)</label>
  <input type="text" id="lab00B-exp5-ch1-10k" class="result-input" placeholder="Input amplitude" data-lab="00B">
</div>
<div class="result-block">
  <label>10 kHz — CH2 Vpp (V)</label>
  <input type="text" id="lab00B-exp5-ch2-10k" class="result-input" placeholder="Output amplitude" data-lab="00B">
</div>

At the cutoff frequency the ratio should be approximately:

$$
\frac{V_{OUT}}{V_{IN}} \approx 0.707 \quad (-3 \text{ dB})
$$
---

## Adjusting The Scales

### Signal Too Small (waveform barely visible)

Increase sensitivity by reducing V/div:

```text
2 V/div  →  1 V/div  →  500 mV/div
```

---

### Signal Too Large (waveform clipped at top or bottom)

Decrease sensitivity by increasing V/div:

```text
500 mV/div  →  1 V/div  →  2 V/div  →  5 V/div
```

---

### Waveform Too Compressed (many cycles visible, hard to measure one)

Increase time resolution by reducing time/div:

```text
1 ms/div  →  500 us/div  →  100 us/div
```

---

### Waveform Too Wide (less than one cycle visible)

Decrease time resolution by increasing time/div:

```text
100 us/div  →  500 us/div  →  1 ms/div
```

---

## Troubleshooting

### No Signal Visible

Check:

✅ Probe tip connected to the correct pin

✅ Probe ground clip connected to Arduino GND

✅ Arduino powered and code uploaded

✅ Correct pin used (PWM requires pins 3, 5, 6, 9, 10, or 11 on Arduino Uno)

---

### Waveform Unstable or Scrolling

Check:

✅ Trigger enabled

✅ Trigger type set to Edge

✅ Trigger level set to approximately half the signal amplitude (around 2.5 V for a 5 V signal)

---
#### Input Signal Visible But Output Missing
  
Check:  
  
✅ Generator output connected to VIN
  
✅ Generator ground connected to circuit GND
  
✅ CH2 probe tip connected to VOUT
  
✅ CH2 probe ground connected to GND
  
✅ Resistor connected between VIN and VOUT
  
✅ Capacitor connected between VOUT and GND
  
✅ Signal generator enabled and outputting a sine wave
  
✅ Common ground shared between signal generator and oscilloscope

---

### Incorrect Voltage Reading

Check:

✅ Vertical scale (V/div) is appropriate for the signal

✅ Probe attenuation switch matches oscilloscope setting (x1 or x10)

✅ Probe ground connected to Arduino GND

---

### Incorrect Frequency Reading

Check:

✅ Horizontal scale (time/div) is appropriate — at least one full cycle should be visible

✅ Trigger is stable

---

### Troubleshooting Checklist

✅ OWON HDS272S powered on

✅ CH1 probe tip connected to signal

✅ CH1 probe ground connected to Arduino GND

✅ Trigger enabled with Edge, Rising

✅ Vertical scale appropriate for signal amplitude

✅ Horizontal scale appropriate for signal frequency

✅ Probe attenuation matches oscilloscope setting

---

## Laboratory Exercises

### Exercise 1

Set the Arduino to output a constant HIGH on pin 9 and measure the DC voltage. Record the result and compare to the expected 5 V.

---

### Exercise 2

Output a PWM signal with `analogWrite(9, 64)` (25% duty cycle). Measure the period, frequency, and duty cycle from the oscilloscope.

---

### Exercise 3

Output a PWM signal with `analogWrite(9, 192)` (75% duty cycle). Sketch the waveform and label the ON time and OFF time.

---

### Exercise 4

Change the horizontal scale while observing the 490 Hz PWM signal. Find the scale setting that shows exactly two complete cycles on screen.

---

### Exercise 5

Connect the potentiometer from Project 00A to A0 and use the following code to vary the PWM duty cycle with the potentiometer. Observe the waveform change on the oscilloscope as you turn the knob.

```cpp
void loop()
{
    int pot = analogRead(A0);          // 0 to 1023
    int duty = pot / 4;                // Scale to 0 to 255
    analogWrite(9, duty);
    delay(10);
}
```
---

### Exercise 6

Build the RC Low-Pass Filter from Experiment 5.

Configure the OWON signal generator:

- Waveform: Sine
- Amplitude: 2 Vpp
- Offset: 0 V

Measure the input voltage and output voltage at:

- 100 Hz
- 1 kHz
- 10 kHz
- 100 kHz

Record the measurements and compare the input and output amplitudes.

Determine experimentally whether the circuit behaves as a low-pass filter.

Calculate the output ratio $V_{OUT} / V_{IN}$ for each test frequency.

---

## Knowledge Check

### Question 1

What does the vertical axis of an oscilloscope represent?

---

### Question 2

What does the horizontal axis of an oscilloscope represent?

---

### Question 3

If the vertical scale is set to 2 V/div and a waveform spans 3 divisions, what is the peak voltage?

---

### Question 4

If the horizontal scale is set to 500 us/div and one cycle spans 4 divisions, what is the period? What is the frequency?

---

### Question 5

Why is triggering important when observing a repeating waveform?

---

### Question 6

Where should the probe ground clip always be connected in Arduino experiments?

---
### Question 7

What is the purpose of CH1 in the low-pass filter experiment?

---

### Question 8

What is the purpose of CH2 in the low-pass filter experiment?

---

### Question 9

Why does the output voltage decrease as the frequency increases?

---

### Question 10

A 10 kΩ resistor and a 100 nF capacitor are connected as a low-pass filter.

The cutoff frequency is approximately 159 Hz.

Would a 100 Hz signal be attenuated more or less than a 10 kHz signal?

Explain your answer.

---

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="00B">Export Results</button>
  <button class="result-clear-btn" data-lab="00B">Clear Results</button>
</div>

---

## Project Summary

In this project you learned:

✅ What an oscilloscope measures and why it is important

✅ How to connect the OWON HDS272S safely

✅ How to adjust the vertical scale

✅ How to adjust the horizontal scale

✅ How to use edge triggering

✅ How to measure DC voltage

✅ How to measure PWM peak voltage, period, frequency, and duty cycle

✅ How to use the built-in signal generator

✅ How to measure input and output signals simultaneously

✅ How to observe a simple low-pass filter

✅ How to compare two waveforms using CH1 and CH2

✅ How to observe signal attenuation as frequency changes

✅ How to adjust scales to suit different signals

---

## Next Project

Proceed to:

```text
01_PWM_Fundamentals.md
```
