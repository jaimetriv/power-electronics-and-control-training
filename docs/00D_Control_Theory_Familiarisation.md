# Control Theory Familiarisation

---

## Purpose

This short review connects the RC and RLC circuits to the control concepts used in Labs 08 and 11-16. It is not a replacement for the assigned sections of Ogata's _Modern Control Engineering_. Use it to refresh the language and equations before continuing with the converter and control labs.

## Reading Before This Review

Read Ogata, Chapter 2, **Mathematical Modeling of Control Systems**, for differential-equation models, transfer functions, and block diagrams. Read Chapter 5, **Transient and Steady-State Response Analysis**, for first-order and second-order responses, poles, damping, overshoot, and settling time.

Use Alexander and Sadiku, Chapters 7 and 8, to connect those ideas to first-order RC and second-order RLC circuits.

## Step-by-Step Study Path

Work through the stages in order. At each stage, write down the model, calculate one prediction, and compare it with a simulation or measurement.

### Step 1: Identify the Plant

Start by naming the physical system, input, output, actuator, sensor, and disturbance.

For Lab 02:

| Role | Example |
|---|---|
| Plant | RC circuit |
| Input | Source voltage $V_S$ |
| Output | Capacitor voltage $V_C$ |
| Actuator | Voltage source or GPIO signal |
| Sensor | Oscilloscope probe |
| Disturbance | Load, source, or component change |

Do not choose a controller until the plant and measured output are clear.

### Step 2: Derive the Differential Equation

Use Kirchhoff's laws and component relationships. For the RC circuit:

1. Write KVL: $V_S=V_R+V_C$.
2. Substitute $V_R=iR$.
3. Substitute $i=C\,dV_C/dt$.
4. Rearrange to $RC\,dV_C/dt+V_C=V_S$.

This equation is the physical model before any Laplace transform is applied.

### Step 3: Convert to a Transfer Function

Assume zero initial conditions, take the Laplace transform, collect the output terms, and divide by the input:

$$
RCsV_C(s)+V_C(s)=V_S(s)
$$

$$
H(s)=\frac{V_C(s)}{V_S(s)}=\frac{1}{RCs+1}
$$

Check that the transfer function is dimensionless and that its DC gain is 1.

### Step 4: Find Poles and Predict the Time Response

Set the denominator equal to zero to find the pole. A negative real pole gives a decaying exponential. For the RC model:

$$
s=-\frac{1}{RC}=-\frac{1}{\tau}
$$

Use the pole to predict the time constant and use the step equation to predict measured voltages.

### Step 5: Compare a Second-Order Model

Repeat the process for the RLC circuit. Match its denominator to:

$$
s^2+2\zeta\omega_n s+\omega_n^2
$$

Then calculate $\omega_n$, $\zeta$, and, when $\zeta<1$, $\omega_d$. Use the pole locations to predict ringing and decay before opening the oscilloscope.

### Step 6: Form the Feedback Loop

Once the plant model is known, add a controller and feedback measurement:

```text
Reference -> Error -> Controller -> Actuator -> Plant -> Output
               ^                                      |
               |------------ Sensor -----------------|
```

For unity negative feedback, the error is $e=r-y$ and the closed-loop transfer function is:

$$
T(s)=\frac{C(s)G(s)}{1+C(s)G(s)}
$$

where $C(s)$ is the controller and $G(s)$ is the plant.

### Step 7: Check Stability Before Hardware

Find the roots of the closed-loop characteristic equation:

$$
1+C(s)G(s)=0
$$

For continuous-time systems:

- Poles with negative real parts produce decaying responses.
- Poles on the imaginary axis produce sustained oscillation in the ideal model.
- Any pole with a positive real part produces an unstable response.

Always simulate a low-gain case before applying a new controller to hardware.

### Step 8: Inspect Frequency Response

Evaluate the plant at $s=j\omega$:

$$
G(j\omega)=G(s)\big|_{s=j\omega}
$$

The magnitude shows how much each frequency is amplified or attenuated. The phase shows the delay introduced by the plant. For the RC low-pass circuit:

$$
|H(j\omega)|=\frac{1}{\sqrt{1+(\omega RC)^2}}
$$

At $\omega=1/(RC)$, the magnitude is $0.707$ or approximately $-3$ dB. This connects the frequency-sweep experiment in Lab 02 to Bode plots used later for controller design.

### Step 9: Translate the Controller to Discrete Time

The ESP32 does not calculate a continuous-time controller. It samples signals every $T_s$ seconds. A practical discrete PI controller can be written as:

$$
I[k]=I[k-1]+K_i e[k]T_s
$$

$$
u_{raw}[k]=K_p e[k]+I[k]
$$

Then limit the actuator command to its permitted range:

$$
u[k]=\operatorname{sat}(u_{raw}[k],u_{min},u_{max})
$$

Sampling time, ADC resolution, PWM resolution, computation delay, and sensor filtering can all change the measured response.

### Step 10: Handle Saturation and Anti-Windup

When the actuator saturates, the integral term can continue accumulating even though the actuator cannot produce more command. This is integral windup.

A simple conditional-integration strategy is:

1. Calculate $u_{raw}$.
2. Apply the actuator limits to obtain $u$.
3. If the actuator is saturated and the error would drive it further into saturation, pause the integral update.
4. Resume integration when the error moves the command back toward the permitted range.

This is essential for the PI and closed-loop buck experiments, where the PWM command is limited to a finite range.

## The Control-System View

A control system can be described as:

```text
Input or reference -> Plant -> Output
                         ^        |
                         |        v
                         +-- Sensor
```

- The **plant** is the physical system being controlled.
- The **input** is the applied command or disturbance.
- The **output** is the measured quantity of interest.
- The **sensor** measures the output for comparison or analysis.
- A **controller** changes the actuator command to influence the plant.

In Labs 02 and 03, the RC or RLC circuit is the plant. The applied source is the input and the measured capacitor voltage is the output.

## Differential Equations and Transfer Functions

A differential equation describes the physical relationship between input and output. For the RC circuit:

$$
RC\frac{dV_C}{dt}+V_C=V_S
$$

With zero initial conditions, the Laplace transform gives the transfer function:

$$
H_{RC}(s)=\frac{V_C(s)}{V_S(s)}=\frac{1}{RCs+1}
$$

A transfer function is a model for the input-output relationship. It does not by itself describe non-zero initial conditions, saturation, noise, or component variation.

## Laplace Transform Essentials

The Laplace transform changes a time-domain differential equation into an algebraic equation in $s$. This makes it easier to derive transfer functions and combine blocks.

Useful transform pairs are:

| Time-domain function | Laplace transform |
|---|---|
| $1$ | $1/s$ |
| $e^{-at}$ | $1/(s+a)$ |
| $\dfrac{dx}{dt}$ | $sX(s)-x(0^-)$ |
| $\displaystyle\int_0^t x(\lambda)\,d\lambda$ | $X(s)/s$ |

For transfer functions, assume zero initial conditions unless the problem states otherwise. A step of amplitude $A$ has transform:

$$
x(t)=A \quad\Longrightarrow\quad X(s)=\frac{A}{s}
$$

### Worked Example 1: RC Transfer Function

For an RC circuit with $R=10\ \mathrm{k\Omega}$ and $C=100\ \mathrm{\mu F}$:

$$
	au=RC=(10\,000)(100\times10^{-6})=1\ \mathrm{s}
$$

The transfer function and pole are:

$$
H(s)=\frac{1}{s+1},\qquad s=-1\ \mathrm{rad/s}
$$

For a 3.3 V step:

$$
V_C(s)=\frac{3.3}{s(s+1)}
$$

Using partial fractions:

$$
V_C(t)=3.3(1-e^{-t})
$$

Therefore, the predicted values are approximately 2.09 V at 1 s, 3.14 V at 3 s, and 3.28 V at 5 s. These are the values to compare with Lab 02.

### Worked Example 2: Laplace Transform of an RC Step

Starting with:

$$
RC\frac{dV_C}{dt}+V_C=V_S
$$

Taking the Laplace transform with $V_C(0^-)=0$ gives:

$$
RCsV_C(s)+V_C(s)=V_S(s)
$$

Collecting $V_C(s)$:

$$
V_C(s)(RCs+1)=V_S(s)
$$

Dividing by the input gives the transfer function:

$$
\frac{V_C(s)}{V_S(s)}=\frac{1}{RCs+1}
$$

For a step input, substitute $V_S(s)=V_F/s$ and use partial fractions to return to the exponential charging equation. This is the same model viewed in the frequency-domain variable $s$ rather than time $t$.

### Worked Example 3: RLC Pole and Ringing Prediction

For Lab 03, take $L=100\ \mathrm{mH}$, $C=100\ \mathrm{nF}$, and $R=100\ \Omega$:

$$
\omega_n=\frac{1}{\sqrt{LC}}=10\,000\ \mathrm{rad/s}
$$

$$
f_n=\frac{\omega_n}{2\pi}\approx1591\ \mathrm{Hz}
$$

$$
\zeta=\frac{R}{2}\sqrt{\frac{C}{L}}=0.05
$$

Since $\zeta<1$, the response is underdamped. Its poles are approximately:

$$
s_{1,2}=-\zeta\omega_n\pm j\omega_n\sqrt{1-\zeta^2}
$$

$$
s_{1,2}\approx-500\pm j9987\ \mathrm{rad/s}
$$

The expected ringing frequency is approximately $1590\ \mathrm{Hz}$, with an exponentially decaying envelope. This gives a prediction to test in the RLC simulation and oscilloscope experiment.

## Poles and Time Constants

The RC pole is found from the denominator:

$$
RCs+1=0\qquad\Longrightarrow\qquad s=-\frac{1}{RC}=-\frac{1}{\tau}
$$

For a stable first-order system, the pole is negative. The time constant is:

$$
\tau=RC
$$

For a step from 0 to $V_F$:

$$
V_C(t)=V_F\left(1-e^{-t/\tau}\right)
$$

Useful checkpoints are:

| Time | Charging level | Discharging level |
|---|---:|---:|
| $1\tau$ | 63.2% | 36.8% remaining |
| $3\tau$ | 95.0% | 5.0% remaining |
| $5\tau$ | 99.3% | 0.7% remaining |

## Second-Order Systems

For the series RLC circuit measured across the capacitor:

$$
LC\frac{d^2V_C}{dt^2}+RC\frac{dV_C}{dt}+V_C=V_S
$$

The standard second-order form is:

$$
H(s)=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}
$$

where:

$$
\omega_n=\frac{1}{\sqrt{LC}},\qquad
\zeta=\frac{R}{2}\sqrt{\frac{C}{L}}
$$

The damping classification is:

| Damping ratio | Response |
|---:|---|
| $\zeta<1$ | Underdamped; ringing and possible overshoot |
| $\zeta=1$ | Critically damped; fastest response without oscillation |
| $\zeta>1$ | Overdamped; no oscillation, slower response |

The damped ringing frequency for an underdamped system is:

$$
\omega_d=\omega_n\sqrt{1-\zeta^2}
$$

## Feedback and Error

In a feedback controller, the error is the difference between the reference and measured output:

$$
e(t)=r(t)-y(t)
$$

A controller uses the error to calculate an actuator command. For a proportional controller:

$$
u(t)=K_p e(t)
$$

Increasing $K_p$ usually reduces error and speeds up the response, but excessive gain can cause overshoot, oscillation, saturation, or instability.

The later controllers extend this action:

- **P:** reacts to present error.
- **PI:** adds accumulated error to reduce steady-state error.
- **PID:** adds a rate-of-change term to shape the transient response.

### Worked Example 4: Proportional Control

Suppose the reference is $r=2.0\ \mathrm{V}$, the measured output is $y=1.6\ \mathrm{V}$, and $K_p=4$:

$$
e=r-y=2.0-1.6=0.4\ \mathrm{V}
$$

$$
u=K_pe=4(0.4)=1.6
$$

The actuator must still limit $u$ to its safe range. If the actuator saturates, increasing $K_p$ cannot produce more physical output and may increase overshoot or recovery time.

### Worked Example 5: Closed-Loop Block Reduction

Let the plant be:

$$
G(s)=\frac{1}{s+1}
$$

and let the controller be a proportional gain $C(s)=2$. For unity negative feedback:

1. Form the forward path: $C(s)G(s)=2/(s+1)$.
2. Add the feedback denominator: $1+C(s)G(s)=1+2/(s+1)$.
3. Simplify:

$$
T(s)=\frac{C(s)G(s)}{1+C(s)G(s)}=\frac{2}{s+3}
$$

The closed-loop pole moved from $-1$ to $-3$. The response is faster, but this conclusion assumes an unsaturated actuator, unity sensor gain, negligible delay, and a valid linear plant model.

## Steady-State Error and System Type

Steady-state error is the final difference between the reference and output:

$$
e_{ss}=\lim_{t\to\infty}e(t)
$$

For the proportional example above, a unit-step reference gives:

$$
T(0)=\frac{2}{3},\qquad y(\infty)=\frac{2}{3},\qquad e_{ss}=1-\frac{2}{3}=\frac{1}{3}
$$

The finite error occurs because proportional control has finite DC loop gain. Adding an integrator increases the system type and can remove step-reference error, provided the closed loop is stable and the actuator does not remain saturated.

## Transient Performance Measures

Use these definitions consistently when comparing simulation and measurement:

| Measure | Meaning |
|---|---|
| Rise time $t_r$ | Time for the response to move between specified percentages, commonly 10% and 90% |
| Peak time $t_p$ | Time at which the first maximum occurs |
| Overshoot $M_p$ | Amount the peak exceeds the final value, expressed as a percentage |
| Settling time $t_s$ | Time after which the response remains within a specified band, commonly 2% or 5% |

For an underdamped standard second-order system, the overshoot is approximately:

$$
M_p=100e^{-\zeta\pi/\sqrt{1-\zeta^2}}\ \%
$$

For a 2% settling-time estimate:

$$
t_s\approx\frac{4}{\zeta\omega_n}
$$

These estimates apply to the standard linear model and may differ from measured hardware when zeros, delays, saturation, or noise are significant.

## Bode Magnitude, Phase, and Bandwidth

For the RC low-pass transfer function:

$$
H(j\omega)=\frac{1}{1+j\omega RC}
$$

The magnitude is:

$$
|H(j\omega)|=\frac{1}{\sqrt{1+(\omega RC)^2}}
$$

The phase is:

$$
\angle H(j\omega)=-\tan^{-1}(\omega RC)
$$

At low frequency, the gain is near 1 and the phase is near $0^\circ$. At the cutoff frequency, the gain is $0.707$ and the phase is $-45^\circ$. At high frequency, the gain decreases at approximately $-20$ dB per decade and the phase approaches $-90^\circ$.

Bandwidth is the range of frequencies passed with acceptable attenuation. For this first-order low-pass example, the bandwidth is approximately $0$ to $f_c$.

## Discrete PI Implementation

The continuous PI controller is:

$$
C(s)=K_p+\frac{K_i}{s}
$$

One practical forward-Euler implementation is:

```text
read measurement
error = reference - measurement
integral = integral + Ki * error * sample_time
raw_command = Kp * error + integral
command = limit(raw_command, command_min, command_max)
write PWM command
```

The actual loop is affected by the sample time, ADC conversion, computation time, PWM update timing, and sensor filtering. The sample time should be much shorter than the dominant plant time constant and fast enough to resolve the important plant dynamics.

## Linearisation Around an Operating Point

Converter models are often nonlinear. For example, an ideal boost converter has:

$$
V_o=\frac{V_{in}}{1-D}
$$

A small change in duty cycle does not produce the same output change at every operating point. Around a chosen operating point $(D_0,V_{o0})$, use small-signal variables:

$$
D=D_0+\hat d,\qquad V_o=V_{o0}+\hat v_o
$$

The linearised relationship is obtained from the local slope:

$$
\hat v_o\approx\left.\frac{\partial V_o}{\partial D}\right|_{D_0}\hat d
$$

For the ideal boost equation:

$$
\frac{\partial V_o}{\partial D}=\frac{V_{in}}{(1-D)^2}
$$

This explains why a controller tuned at one duty cycle may behave differently at another. Real converter design also includes inductor, capacitor, load, switching, and control dynamics.

## Model Assumptions

Compare a model and measurement by listing assumptions. Typical differences include:

- Component tolerance and parasitic resistance
- Oscilloscope probe loading and bandwidth
- Sensor scaling and ADC quantisation
- Sampling and computation delay
- Actuator saturation
- Switching ripple and measurement noise
- Operating-point dependence

## Exercises

Try these before looking at the answer key.

1. For $R=22\ \mathrm{k\Omega}$ and $C=47\ \mathrm{\mu F}$, calculate $\tau$, the pole, and the cutoff frequency.
2. For a 5 V step and $\tau=0.2\ \mathrm{s}$, calculate the output at $t=0.2\ \mathrm{s}$ and $t=0.6\ \mathrm{s}$.
3. For $L=47\ \mathrm{mH}$, $C=100\ \mathrm{nF}$, and $R=47\ \Omega$, calculate $\omega_n$ and $\zeta$. Classify the response.
4. For $H(s)=5/(s+5)$ and a 2 V step, write $Y(s)$ and the time-domain output $y(t)$.
5. A proportional controller has $r=3\ \mathrm{V}$, $y=2.4\ \mathrm{V}$, and $K_p=2.5$. Calculate the error and controller output.
6. From a measured step response, the final value is 4 V and the output reaches 2.53 V at 0.8 s. Estimate the first-order time constant.
7. For $G(s)=1/(s+1)$ with a proportional controller $C(s)=2$, derive the unity-feedback closed-loop transfer function and its pole.
8. For $G(s)=1/(s+2)$ and $C(s)=3$, determine whether the unity-feedback system is stable.
9. For $R=10\ \mathrm{k\Omega}$ and $C=100\ \mathrm{nF}$, calculate $f_c$ and the magnitude at the cutoff frequency.
10. For $K_p=2$, $K_i=5$, $T_s=0.01\ \mathrm{s}$, $e[k]=0.4$, and $I[k-1]=0$, calculate $I[k]$ and $u_{raw}[k]$.
11. A PI controller requests $u_{raw}=1.4$ but the actuator limit is $u_{max}=1.0$. Explain what should happen to the integral update if the positive error would drive the command further upward.
12. For a standard second-order system with $\zeta=0.5$ and $\omega_n=10\ \mathrm{rad/s}$, estimate percentage overshoot and 2% settling time.
13. For $H(s)=1/(1+s)$, calculate the magnitude and phase at $\omega=1\ \mathrm{rad/s}$.
14. For an ideal boost converter with $V_{in}=3.3\ \mathrm{V}$ at $D_0=0.5$, calculate the local output-voltage slope $\partial V_o/\partial D$.
15. Explain two reasons why a discrete PI controller can behave differently from its continuous-time simulation.
16. A unity-feedback plant has a sensor gain of $0.5$ rather than 1. Explain why the unity-feedback formula cannot be used without modification.

## Answer Key

1. $\tau=1.034\ \mathrm{s}$, pole $\approx-0.967\ \mathrm{rad/s}$, and $f_c\approx0.154\ \mathrm{Hz}$.
2. $y(0.2)\approx3.16\ \mathrm{V}$ and $y(0.6)\approx4.75\ \mathrm{V}$.
3. $\omega_n\approx14\,586\ \mathrm{rad/s}$, $\zeta\approx0.034$, underdamped.
4. $Y(s)=10/[s(s+5)]$ and $y(t)=2(1-e^{-5t})$ V.
5. $e=0.6\ \mathrm{V}$ and $u=1.5$.
6. Since 2.53 V is 63.2% of 4 V, $\tau\approx0.8\ \mathrm{s}$.
7. $T(s)=2/(s+3)$ and the pole is $s=-3$.
8. $T(s)=3/(s+5)$; the pole is $s=-5$, so the system is stable.
9. $f_c\approx159\ \mathrm{Hz}$ and the magnitude is $0.707$ at the cutoff.
10. $I[k]=0.02$ and $u_{raw}[k]=0.82$.
11. Set $u=1.0$ and pause integration while the positive error would push the command further into saturation.
12. $M_p\approx16.3\%$ and $t_s\approx0.8\ \mathrm{s}$.
13. Magnitude $\approx0.707$ and phase $=-45^\circ$.
14. $\partial V_o/\partial D=3.3/(1-0.5)^2=13.2\ \mathrm{V}$ per unit duty ratio.
15. Possible causes include sampling delay, ADC quantisation, PWM update timing, actuator saturation, and sensor filtering.
16. Use $T(s)=C(s)G(s)/(1+C(s)G(s)H(s))$ with sensor transfer function $H(s)=0.5$.

## Checkpoint Exercise

Complete these before Lab 04 or the converter sequence:

1. From the RC circuit, calculate $\tau$ and the pole for the component values used in Lab 02.
2. From the RLC circuit, calculate $\omega_n$, $\zeta$, and whether the response is underdamped.
3. Mark the expected $1\tau$, $3\tau$, and $5\tau$ points on a measured step response.
4. Compare one measured waveform with its transfer-function prediction.
5. Record two assumptions that explain the difference.

## Link to Later Labs

- Lab 08 treats the motor as a dynamic plant.
- Lab 11 identifies a model from measured data.
- Labs 12-14 apply P, PI, and PID feedback.
- Labs 15-16 apply the models and controllers to a buck converter and design problem.

## Next Step

Continue to [MOSFET Fundamentals](04_MOSFET_Fundamentals.md), then complete the converter sequence before starting [System Identification](11_System_Identification.md).
