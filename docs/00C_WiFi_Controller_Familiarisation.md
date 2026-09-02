# Project 00C - ESP32 DevKit V1 Familiarisation

---

## Objective

The objective of this project is to become familiar with the ESP32 DevKit V1 development platform and how to program it using the Arduino IDE.

This project introduces the key differences between the ESP32 and the Arduino Uno, including:

- 3.3 V logic levels
- Higher clock frequency and dual-core architecture
- Increased PWM resolution and flexibility
- Analogue input reading
- Serial communications
- Built-in WiFi and Bluetooth capabilities

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Identify the main ESP32 DevKit V1 components

✅ Install the ESP32 board package in Arduino IDE

✅ Upload programs to the ESP32

✅ Use digital outputs

✅ Read digital inputs

✅ Read analogue inputs

✅ Generate PWM signals using the LEDC peripheral

✅ Use the Serial Monitor

✅ Understand the key differences from the Arduino Uno

---

## What Is the ESP32?

The ESP32 is a powerful microcontroller designed for connected and high-performance embedded applications.

The ESP32 DevKit V1 combines:

```text
Dual-Core Microcontroller
+
Input/Output Pins
+
WiFi and Bluetooth
+
USB Programming Interface
```

on a single development board.

---

## Why Use the ESP32?

The ESP32 offers significant advantages over the Arduino Uno for advanced projects:

- Higher clock speed
- More processing power
- Higher PWM resolution
- More analogue inputs
- Built-in WiFi and Bluetooth
- Hardware timers suitable for power electronics control

Many of the advanced projects in this course use the ESP32 because:

```text
Higher PWM Resolution
```

is required for precise control of:

- Buck Converters
- Boost Converters
- Inverters
- Grid-Following VSCs
- Grid-Forming VSCs

---

## ESP32 DevKit V1 Overview

Typical ESP32 DevKit V1:

```text
 ┌─────────────────────┐
 │ USB Connector       │
 │                     │
 │   ESP32-WROOM-32    │
 │                     │
 │   ESP32 DevKit V1   │
 │                     │
 │ GPIO0 - GPIO39      │
 │ 3.3V   GND          │
 └─────────────────────┘
```

---

## Main Features

### Microcontroller Module

```text
ESP32-WROOM-32
```

The WROOM-32 module contains the silicon chip:

```text
ESP32-D0WD-v3  (revision 3.1)
```

---

### CPU Cores

```text
Dual Xtensa LX6 at 240 MHz
+ ULP (Ultra-Low Power) co-processor
```

The two main cores run application code.
The ULP co-processor can run simple tasks while the main cores are in deep sleep,
which is useful for low-power sensing applications.

---

### Crystal Frequency

```text
40 MHz external crystal
```

---

### Clock Frequency

```text
240 MHz (CPU)
```

---

### Digital I/O Pins

```text
Up to 34
```

Pins:

```text
GPIO0 to GPIO39
```

Not all pins are available on every DevKit layout.

---

### Analogue Inputs

```text
18
```

12-bit ADC resolution:

```text
0 to 4095
```

---

### PWM

The ESP32 uses a dedicated peripheral called:

```text
LEDC
```

(LED Control)

Features:

- 16 independent PWM channels
- Up to 16-bit resolution
- Configurable frequency

---

### Logic Level

```text
3.3 V
```

This is an important difference from the Arduino Uno.

---

## Important Difference - Logic Level

The Arduino Uno operates at:

```text
5 V
```

The ESP32 operates at:

```text
3.3 V
```

Never connect 5 V signals directly to ESP32 GPIO pins.

This can permanently damage the device.

---

## Important Pins

### 3.3V

Provides:

```text
+3.3 V
```

power output.

Maximum current is limited. Do not draw more than approximately 200 mA from this pin.

---

### GND

Circuit reference.

All circuits require a common ground connection.

---

### GPIO Pins

Used for:

```text
Digital and Analogue Signals
```

---

### VIN

Accepts:

```text
5 V
```

from USB or external supply.

The onboard regulator converts this to 3.3 V internally.

---

## Development Environment

Programs are written using:

```text
Arduino IDE
```

The ESP32 requires an additional board package to be installed.

---

## Connecting the ESP32 to Your Computer

The ESP32 DevKit V1 connects via a **Micro-USB cable**.

Plug:

```text
Micro-USB end  →  ESP32 DevKit V1
USB-A end      →  Computer
```

The board is powered and programmed through the same cable.

---

## Connecting on Linux

Linux includes the CP210x USB-to-serial driver by default. No manual driver installation is needed.

### Step 1 - Confirm the Device Is Recognised

After plugging in the ESP32, run:

```bash
ls /dev/ttyUSB*
```

You should see:

```text
/dev/ttyUSB0
```

If nothing appears, run:

```bash
dmesg | grep ttyUSB
```

You should see a line like:

```text
usb 1-1: cp210x converter now attached to ttyUSB0
```

If `ttyUSB0` still does not appear, try a different USB cable. Some cables are charge-only and carry no data.

---

### Step 2 - Add Your User to the dialout Group

By default, Linux restricts access to serial ports. Add your user to the `dialout` group:

```bash
sudo usermod -aG dialout $USER
```

Then log out and back in for the change to take effect.

Without this step, Arduino IDE will fail to upload with a permission error.

---

### Step 3 - Select the Port in Arduino IDE

In Arduino IDE go to:

```text
Tools → Port
```

Select:

```text
/dev/ttyUSB0
```

On Linux the port appears as `/dev/ttyUSB0` rather than a COM port as on Windows.

---

## Installing the ESP32 Board Package

This tutorial is validated with the Arduino-ESP32 core available through Boards Manager.
If you use a newer major core version, LEDC API calls may change; check the official migration notes if examples do not compile.

### Step 1

Open Arduino IDE.

Go to:

```text
File → Preferences
```

---

### Step 2

In the field:

```text
Additional Boards Manager URLs
```

add:

```text
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```

---

### Step 3

Go to:

```text
Tools → Board → Boards Manager
```

Search for:

```text
esp32
```

Install:

```text
esp32 by Espressif Systems
```

---

### Step 4

Select the board:

```text
Tools → Board → ESP32 Arduino → DOIT ESP32 DevKit V1
```

---

### Step 5

Select the correct COM port:

```text
Tools → Port
```

---

## First Program

A traditional first program flashes an LED.

---

## Built-In LED

The ESP32 DevKit V1 contains a built-in LED connected to:

```text
GPIO2
```

---

## Blink Program

```cpp
void setup()
{
    pinMode(2, OUTPUT);
}

void loop()
{
    digitalWrite(2, HIGH);
    delay(500);

    digitalWrite(2, LOW);
    delay(500);
}
```

---

## Understanding setup()

The function:

```cpp
setup()
```

runs:

```text
Once
```

after power-up.

Typically used for:

- Pin configuration
- Peripheral initialisation

---

## Understanding loop()

The function:

```cpp
loop()
```

runs continuously:

```text
Forever
```

until power is removed.

---

## Experiment 1 - LED Flashing

### Objective

Flash the onboard LED to confirm the board package installation, USB connection, and upload process all work correctly before adding any external components.

---

### Procedure

1. Connect the ESP32 to your computer using the USB cable.
2. Open the Arduino IDE.
3. Go to **Tools → Board → ESP32 Arduino** and select **DOIT ESP32 DevKit V1**.
4. Go to **Tools → Port** and select the COM port that appears when the ESP32 is connected. If you are unsure which port, disconnect the ESP32, note the list, reconnect, and the new entry is the correct port.
5. Create a new sketch (**File → New**).
6. Delete any default text and enter the Blink code below.
7. Click **Upload** (right-arrow button). On some ESP32 boards you must hold the **BOOT** button during upload until the IDE shows *Connecting...* in the status bar.
8. Wait for the status bar to show **Done uploading**.

---

### Blink Code

```cpp
void setup()
{
    // Configure GPIO2 as an output.
    // The built-in LED is physically connected to GPIO2 on the ESP32 DevKit V1.
    pinMode(2, OUTPUT);
}

void loop()
{
    digitalWrite(2, HIGH);   // Set GPIO2 HIGH → LED turns ON
    delay(500);              // Wait 500 milliseconds (0.5 seconds)

    digitalWrite(2, LOW);    // Set GPIO2 LOW  → LED turns OFF
    delay(500);              // Wait 500 milliseconds
    // loop() repeats from the top indefinitely
}
```

---

### Observe

The small LED on the ESP32 board should flash:

```text
ON for 0.5 seconds

OFF for 0.5 seconds
```

repeatedly.

If it does not flash, check the troubleshooting section at the end of this lab.

---

## Experiment 2 - External LED

### Objective

Drive an external LED from a GPIO pin to confirm digital output wiring and the 3.3 V logic level.

### Components

- LED
- 220 Ω resistor
- Breadboard
- 2 jumper wires

---

### About the LED

An LED has two legs of different lengths:

```text
Long leg  → Anode   (positive, +)
Short leg → Cathode (negative, −)
```

Current must flow from the anode to the cathode for the LED to light up.

---

### Why Is a Resistor Needed?

Without a resistor the LED would draw too much current and burn out immediately.

A 220 Ω resistor limits the current to a safe level (approximately 15 mA from a 3.3 V supply).

Resistors are not polarised; they can be connected either way around.

---

### Circuit Diagram

```text
ESP32 GPIO18
    │
   220 Ω resistor
    │
   LED anode (long leg)
   LED cathode (short leg)
    │
ESP32 GND pin
```

---

### Step-by-Step Wiring

1. Push the 220 Ω resistor across the breadboard so each leg is in a different row.
2. Connect a jumper wire from **ESP32 GPIO18** to one leg of the resistor.
3. Insert the LED so its **long leg (anode)** sits in the same row as the other leg of the resistor.
4. Connect a jumper wire from the **LED short leg (cathode)** row to any **GND** pin on the ESP32.

The current path will be:

```text
GPIO18 → Resistor → LED anode → LED cathode → GND
```

> Tip: Always double-check that the LED legs are the correct way around before uploading code. If the LED is reversed, no damage occurs but it will not light.

---

### Code

```cpp
void setup()
{
    // Configure GPIO18 as a digital output.
    // GPIO18 is a safe general-purpose output pin on the ESP32 DevKit V1.
    pinMode(18, OUTPUT);
}

void loop()
{
    digitalWrite(18, HIGH);   // Pull GPIO18 to 3.3 V → current flows → LED ON
    delay(1000);              // Wait 1 second (1000 milliseconds)

    digitalWrite(18, LOW);    // Pull GPIO18 to 0 V → no current → LED OFF
    delay(1000);              // Wait 1 second
    // Repeats indefinitely
}
```

---

### Wiring Checklist

Before uploading:

✅ Resistor leg in same breadboard row as ESP32 GPIO18 jumper

✅ LED long leg (anode) in same row as other resistor leg

✅ LED short leg (cathode) connected to GND

✅ GND jumper connects LED cathode row to any GND pin on ESP32

---

### Observe

The external LED should flash:

```text
ON for 1 second

OFF for 1 second
```

repeatedly.

---

## Experiment 3 - Push Button

### Objective

Read a digital input using the ESP32's internal pull-up resistor and use the result to control the onboard LED.

### Components

- Tactile push button
- Breadboard
- 3 jumper wires

---

### About the Push Button

The tactile push buttons have 4 legs.

Internally, each pair of legs on the same side is already connected together. Pressing the button bridges the two sides.

```text
Left pair  ●───────────●  Right pair
               (gap)
           ← press bridges →
```

Use legs on opposite sides (one from each pair) as your two connection points.

---

### Why INPUT_PULLUP?

Without a pull-up resistor the input pin would float (undefined voltage) when the button is not pressed, giving random readings.

Using `INPUT_PULLUP` enables the ESP32's internal pull-up resistor, which keeps the pin at 3.3 V (HIGH) when the button is open.

Pressing the button connects the pin directly to GND, pulling it LOW.

This means the logic is **inverted**: button pressed = LOW, button released = HIGH.

---

### Circuit Diagram

```text
ESP32 GPIO4
    │
  Button leg A (one side)
  Button leg B (other side)
    │
ESP32 GND pin
```

No external resistor is needed because INPUT_PULLUP handles it internally.

---

### Step-by-Step Wiring

1. Insert the push button into the breadboard so its legs straddle the centre gap (one pair of legs on each side of the gap).
2. Connect a jumper wire from **ESP32 GPIO4** to one button leg (either side).
3. Connect a jumper wire from the **opposite side** button leg to any **GND** pin on the ESP32.
4. The built-in LED on GPIO2 is used for output; no extra wiring needed.

> Tip: If the button does not respond, rotate it 90 degrees. Some breadboard orientations connect legs that should be separated.

---

### Code

```cpp
void setup()
{
    // INPUT_PULLUP keeps GPIO4 at HIGH (3.3 V) when the button is open.
    // Pressing the button connects GPIO4 to GND, reading LOW.
    pinMode(4, INPUT_PULLUP);

    // Configure the built-in LED pin as output.
    pinMode(2, OUTPUT);
}

void loop()
{
    // digitalRead(4) returns LOW (0) when button is pressed,
    // HIGH (1) when released, because of the pull-up.
    // The ! (NOT) operator inverts this so:
    //   button pressed  → state = 1 → LED ON
    //   button released → state = 0 → LED OFF
    int state = !digitalRead(4);

    // Write the result directly to the LED pin.
    digitalWrite(2, state);
}
```

---

### Wiring Checklist

Before uploading:

✅ Button straddles the breadboard centre gap

✅ GPIO4 jumper connects to one side of the button

✅ GND jumper connects to the other side of the button

✅ No external resistor needed (pull-up is internal)

---

### Observe

- Press the button → onboard LED turns ON.
- Release the button → onboard LED turns OFF.

---

## What Is An Analogue Input?

Some signals vary continuously.

Examples:

- Potentiometers
- Temperature sensors
- Current sensors
- Voltage dividers

---

## ADC Fundamentals

The ESP32 ADC converts:

```text
0 V to 3.3 V
```

into:

```text
0 to 4095
```

digital counts.

Resolution:

```text
12-bit
```

---

## Example

```text
0 V     → 0

1.65 V  → 2048

3.3 V   → 4095
```

approximately.

---

## ADC Note

The ESP32 ADC has known non-linearity near the rail voltages.

For best accuracy keep input signals between:

```text
0.1 V and 3.1 V
```

Your chip (ESP32-D0WD-v3 revision 3.1) has **ADC Vref calibration data stored in eFuse**.
This means the Arduino ESP32 core can apply factory calibration automatically,
giving better voltage accuracy than older uncalibrated ESP32 chips.

For raw ADC counts (`analogRead()`), calibration reduces offset errors.
For converted voltages, use `analogReadMilliVolts()` to get calibration-corrected millivolt readings.

---

## Experiment 4 - Reading a Potentiometer

### Objective

Read a continuously varying voltage from a potentiometer and display the raw ADC value in the Serial Monitor.

### Components

- 10 kΩ potentiometer
- Breadboard
- 3 jumper wires

---

### About the Potentiometer

A potentiometer has three pins:

```text
Left pin   → connect to 3.3V
Centre pin → the wiper; voltage varies as you turn the knob
Right pin  → connect to GND
```

Turning the knob moves the wiper between GND and 3.3 V.

> Important: Use the **3.3 V** pin, not 5 V. Applying 5 V to a GPIO pin will damage the ESP32.

> Tip: If your readings go in the wrong direction (high when turned left instead of right), simply swap the 3.3 V and GND connections.

---

### Circuit Diagram

```text
ESP32 3.3V
    │
  Left leg of potentiometer
  Centre leg ──── GPIO34 (ESP32 analogue input)
  Right leg
    │
ESP32 GND
```

GPIO34 is used because it is input-only and ADC-capable, making it a safe choice for analogue measurements.

---

### Step-by-Step Wiring

1. Insert the potentiometer into the breadboard so all three legs are in separate rows.
2. Connect a jumper wire from **ESP32 3.3V** to the **left outer leg**.
3. Connect a jumper wire from the **centre leg** (the wiper) to **ESP32 GPIO34**.
4. Connect a jumper wire from the **right outer leg** to **ESP32 GND**.

The centre pin now produces a voltage between 0 V and 3.3 V as you turn the shaft.

---

### Code

```cpp
void setup()
{
    // Start serial communication at 115200 baud.
    // The ESP32 typically uses 115200 rather than the Arduino Uno's 9600.
    Serial.begin(115200);
}

void loop()
{
    // analogRead() samples the voltage on GPIO34 and converts it
    // to a number from 0 (= 0 V) to 4095 (= 3.3 V).
    int value = analogRead(34);

    // Print the reading followed by a newline character.
    Serial.println(value);

    // Wait 100 ms before the next reading to avoid flooding
    // the Serial Monitor with too many values per second.
    delay(100);
}
```

---

### Opening the Serial Monitor

1. Upload the code.
2. In the Arduino IDE go to **Tools → Serial Monitor** (or press Ctrl+Shift+M).
3. Set the baud rate in the bottom-right of the Serial Monitor to **115200 baud**.
4. Turn the potentiometer shaft and watch the numbers change between 0 and 4095.

---

### Converting ADC Value to Voltage

To display the actual voltage instead of the raw count:

```cpp
float voltage = value * (3.3 / 4095.0);
Serial.println(voltage);
```

---

### Wiring Checklist

Before uploading:

✅ 3.3V jumper connects to one outer leg of potentiometer

✅ GND jumper connects to the other outer leg

✅ GPIO34 jumper connects to the centre (wiper) leg

✅ Serial Monitor baud rate set to 115200

---

### Observe

Turn the potentiometer shaft fully in each direction.

The Serial Monitor should show values sweeping between approximately:

```text
0  (shaft at GND end)

4095  (shaft at 3.3 V end)
```

---

## PWM on the ESP32

The ESP32 does not use:

```cpp
analogWrite()
```

Instead it uses the LEDC peripheral.

---

## LEDC PWM Setup

Three steps are required:

```text
1. Configure channel frequency and resolution

2. Attach channel to a GPIO pin

3. Set duty cycle
```

> These examples use the ESP32 Arduino core v2.x LEDC API. If using core v3.x, replace `ledcSetup(ch, freq, res)` + `ledcAttachPin(pin, ch)` with `ledcAttach(pin, freq, res)`, and replace `ledcWrite(ch, duty)` with `ledcWrite(pin, duty)`.

---

## LEDC Functions

### Configure Channel

```cpp
ledcSetup(channel, frequency, resolution);
```

---

### Attach Pin

```cpp
ledcAttachPin(pin, channel);
```

---

### Set Duty Cycle

```cpp
ledcWrite(channel, duty);
```

---

## PWM Resolution

With 8-bit resolution:

```text
0 to 255
```

With 10-bit resolution:

```text
0 to 1023
```

With 16-bit resolution:

```text
0 to 65535
```

Higher resolution allows finer control.

---

## Experiment 5 - LED Brightness Control

### Objective

Control the brightness of an external LED using PWM to demonstrate the LEDC peripheral and smooth analogue-like output.

### Circuit

**Important:** Use **GPIO18**. This is a PWM-capable output pin and is used for all ESP32 PWM experiments in this course.

---

### Breadboard Diagram

```
  ESP32 DevKit V1              BREADBOARD (top view, rows 1–12)
  ┌────────────┐
  │            │               Columns
  │            │         a      b      c      d      e
  │    GPIO18  ●────┐  ┌─────────────────────────────────────┐
  │            │    │  │ 1   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    │  │ 2   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    │  │ 3   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    │  │ 4   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    └─→│ 5   [●]   [ ]   [┐]   [ ]   [ ]    │ GPIO18 wire → a5
  │            │       │ 6   [ ]   [ ]   [│]   [ ]   [ ]    │
  │            │       │ 7   [ ]   [ ]   [│]   [ ]   [ ]    │ 220 Ω resistor (c5–c8)
  │            │       │ 8   [ ]   [ ]   [┘]   [ ]   [▲]   │ resistor bottom c8, LED+ e8
  │            │       │ 9   [ ]   [ ]   [ ]   [ ]   [│]   │
  │            │       │10   [ ]   [ ]   [ ]   [ ]   [▼]   │ LED cathode at e10
  │        GND ●────┐  │11   [ ]   [ ]   [ ]   [ ]   [ ]   │
  │            │    │  └─────────────────────────────────────┘
  └────────────┘    │                                │
                    │                                │ GND wire
                    └────────────────────────────────┘
```

### How the rows connect internally

```
Row 5:  a5 ─── b5 ─── c5 ─── d5 ─── e5   (all connected inside the breadboard)
         ↑              ↑
    GPIO18 wire    Resistor top leg
    plugs here     plugs here → no extra wire needed between them
```

```
Row 8:  a8 ─── b8 ─── c8 ─── d8 ─── e8   (all connected inside the breadboard)
                        ↑               ↑
               Resistor bottom leg   LED anode (long leg)
               plugs here            plugs here → no extra wire needed
```

### Step-by-Step Wiring

1. Insert the **220 Ω resistor** vertically so one leg is in **row 5, column c** and the other in **row 8, column c**.
2. Connect a jumper wire from **ESP32 GPIO18** to **row 5, column a**.
3. Insert the **LED** so the **long leg (anode, +)** is in **row 8, column e** and the **short leg (cathode, −)** is in **row 10, column e**.
4. Connect a jumper wire from **row 10, column e** to any **GND pin** on the ESP32.

### Wiring Checklist

Before uploading:

✅ 220 Ω resistor vertical in column c, rows 5–8

✅ GPIO18 jumper wire to row 5, column a

✅ LED long leg (anode) at row 8, column e (same row as resistor bottom)

✅ LED short leg (cathode) at row 10, column e connected to GND

---

### Code

```cpp
void setup()
{
    // Configure LEDC channel 0:
    //   Frequency  = 5000 Hz
    //   Resolution = 8-bit (duty cycle range: 0 to 255)
    ledcSetup(0, 5000, 8);

    // Attach GPIO18 to LEDC channel 0.
    // From this point, ledcWrite() controls the signal on GPIO18.
    ledcAttachPin(18, 0);
}

void loop()
{
    // Fade UP: increase duty cycle from 0% to 100%
    // i goes from 0 (off) to 255 (fully on)
    for (int i = 0; i <= 255; i++)
    {
        // ledcWrite sets the duty cycle on channel 0.
        // Value 0   = 0%   duty cycle (LED off)
        // Value 128 = ~50% duty cycle (half brightness)
        // Value 255 = 100% duty cycle (full brightness)
        ledcWrite(0, i);

        delay(10);   // Wait 10 ms between steps for a smooth visible fade
    }

    // Fade DOWN: decrease duty cycle from 100% back to 0%
    for (int i = 255; i >= 0; i--)
    {
        ledcWrite(0, i);

        delay(10);   // Same step delay for symmetrical fade
    }
    // loop() repeats, so the LED fades up and down continuously
}
```

---

### Wiring Checklist

Before uploading:

✅ 220 Ω resistor connected to GPIO18

✅ LED long leg (anode) connected to other resistor leg

✅ LED short leg (cathode) connected to GND

---

### Observe

The LED should:

```text
Gradually Brighten  (fade up over ~2.5 seconds)

Gradually Dim       (fade down over ~2.5 seconds)
```

continuously.

---

## Experiment 6 - Higher PWM Resolution

### Objective

Repeat Experiment 5 using 10-bit resolution to observe the effect of finer duty cycle steps.

### Circuit

Same as Experiment 5.

---

### Code

```cpp
void setup()
{
    // Configure LEDC channel 0:
    //   Frequency  = 5000 Hz
    //   Resolution = 10-bit (duty cycle range: 0 to 1023)
    ledcSetup(0, 5000, 10);

    ledcAttachPin(18, 0);
}

void loop()
{
    // Fade UP: 0 to 1023 (10-bit full range)
    for (int i = 0; i <= 1023; i++)
    {
        ledcWrite(0, i);

        delay(5);   // Shorter delay to keep total fade time similar
    }

    // Fade DOWN: 1023 back to 0
    for (int i = 1023; i >= 0; i--)
    {
        ledcWrite(0, i);

        delay(5);
    }
}
```

---

### Observe

The transition should appear smoother because:

```text
1024 steps
```

are available instead of:

```text
256 steps
```

---

## Comparison Table

| Feature | Arduino Uno | ESP32 DevKit V1 |
|---------|------------|----------------|
| Voltage | 5 V | 3.3 V |
| Clock | 16 MHz | 240 MHz |
| ADC Resolution | 10-bit | 12-bit |
| PWM Resolution | 8-bit | Up to 16-bit |
| PWM Channels | 6 | 16 |
| WiFi | No | Yes |
| Bluetooth | No | Yes |
| PWM Function | analogWrite() | ledcWrite() |

---

## Why PWM Resolution Matters

In power electronics applications:

```text
Higher Resolution
```

means:

```text
Finer Duty Cycle Control
```

For a Buck Converter operating at:

```text
12 V Input
```

with 8-bit resolution the minimum voltage step is approximately:

$$
\frac{12}{255} \approx 47 \text{ mV}
$$

With 16-bit resolution:

$$
\frac{12}{65535} \approx 0.18 \text{ mV}
$$

This is important for precise voltage regulation.

---

## Troubleshooting

### Upload Fails

Check:

✅ USB cable

✅ Board selection set to DOIT ESP32 DevKit V1

✅ COM port selection

✅ Hold BOOT button during upload if required

---

### LED Does Not Flash

Check:

✅ GPIO number matches the code

✅ Wiring (LED polarity, resistor in series)

✅ 3.3 V logic level — do not use 5 V components directly

✅ Upload completed successfully

---

### Serial Monitor Empty

Check:

✅ Baud rate set to 115200

✅ USB connection

✅ Correct COM port

---

### LEDC PWM Not Working

Check:

✅ ledcSetup() called in setup()

✅ ledcAttachPin() called before ledcWrite()

✅ Channel number consistent across all three functions

---

## Laboratory Exercises

### Exercise 1

Modify Blink to flash at:

```text
100 ms ON

100 ms OFF
```

---

### Exercise 2

Read a potentiometer on GPIO34 and print the value to the Serial Monitor.

---

### Exercise 3

Map the potentiometer reading (0–4095) to a PWM duty cycle (0–255) and control LED brightness:

```cpp
int pot   = analogRead(34);
int duty  = pot / 16;        // Scale 12-bit ADC to 8-bit PWM
ledcWrite(0, duty);
```

---

### Exercise 4

Change the PWM frequency to 20 kHz and observe any difference in LED behaviour.

---

### Exercise 5

Use 12-bit PWM resolution and sweep the duty cycle from 0 to 4095.

---

## Knowledge Check

### Question 1

What logic voltage level does the ESP32 use?

---

### Question 2

What function replaces analogWrite() on the ESP32?

---

### Question 3

What is the ADC resolution of the ESP32?

---

### Question 4

How many PWM channels does the ESP32 LEDC peripheral provide?

---

### Question 5

Why is higher PWM resolution important in power electronics?

---

<div class="result-actions">
  <button class="result-export-btn" data-lab="00C">Export Results</button>
  <button class="result-clear-btn" data-lab="00C">Clear Results</button>
</div>

---

## Project Summary

In this project you learned:

✅ ESP32 DevKit V1 hardware

✅ Arduino IDE ESP32 board package installation

✅ Digital Outputs

✅ Digital Inputs

✅ Analogue Inputs

✅ LEDC PWM generation

✅ PWM resolution and frequency configuration

✅ Key differences from the Arduino Uno

These skills are required for the advanced projects in this course:

```text
17_Grid_Following_VSC.md

18_Grid_Forming_VSC.md
```

where the ESP32 is used as the primary controller.

---

## Next Project

Proceed to:

```text
01_PWM_Fundamentals.md
```
