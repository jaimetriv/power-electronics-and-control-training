# Control Theory Familiarisation

---

## Purpose and Task

This guided introduction reviews the control-engineering ideas used later in the course. It is self-contained: the circuit, controller, and converter values needed for the examples are given here. Work through the steps in sequence; each step introduces one idea and then applies it numerically.

The overall task is to model a simple physical system, predict its response, add feedback, and consider what changes when the controller runs digitally or the plant is a converter.

## Worked-Example Parameters

| Example | Parameter | Value |
|---|---|---:|
| RC plant | $R$, $C$ | $10\ \mathrm{k\Omega}$, $100\ \mathrm{\mu F}$ |
| RC input | Step $V_S$, initial $V_C(0)$ | $3.3\ \mathrm{V}$, $0\ \mathrm{V}$ |
| RLC plant | $R$, $L$, $C$ | $100\ \Omega$, $100\ \mathrm{mH}$, $100\ \mathrm{nF}$ |
| P feedback | $K_p$, reference, sensor gain | $2$, $3.3\ \mathrm{V}$, $1$ |
| Digital PI | $K_p$, $K_i$, $T_s$ | $2$, $5\ \mathrm{s^{-1}}$, $0.01\ \mathrm{s}$ |
| Digital PI | Initial error, integral state | $0.4\ \mathrm{V}$, $0\ \mathrm{V}$ |
| Boost linearisation | $V_{IN}$, operating duty $D_0$, duty change $\hat d$ | $3.3\ \mathrm{V}$, $0.5$, $0.01$ |

## Step 1: Identify the System

A **plant** is the physical system being studied or controlled. Its **input** is the applied signal; its **output** is the quantity of interest. A sensor measures the output, an actuator applies the command, and a disturbance is an unwanted change such as a load increase.

This description is the starting point for any model: decide what quantity enters the plant and what quantity you will observe. In a control loop, the measured output is compared with a reference; in an open-loop experiment, you can simply observe how the output responds to a chosen input.

**Read more:** Ogata, Ch. 2, **Mathematical Modeling of Control Systems**; Ch. 6, **Control Systems and Control Systems Components**.

```text
Reference -> Controller -> Actuator -> Plant -> Output
                 ^                           |
                 +--------- Sensor -----------+
```

**Worked example:** for the RC plant, the input is source voltage $V_S$, the output is capacitor voltage $V_C$, the plant is the R-C circuit, and a voltage probe is the sensor. A changed load would be a disturbance. At this stage we are observing the system; no controller is required.

## Step 2: Write a Physical Model

Use circuit laws and component relationships. For the series RC circuit:

The differential equation expresses the physical laws in terms of changing signals. It is useful before choosing a control strategy because it exposes the system's energy storage and time-dependent behavior. Keep initial conditions and units explicit.

$$
V_S=V_R+V_C,\qquad V_R=iR,\qquad i=C\frac{dV_C}{dt}
$$

Substitution gives:

$$
RC\frac{dV_C}{dt}+V_C=V_S
$$

**Worked example:** $RC=(10\,000)(100\times10^{-6})=1\ \mathrm{s}$. The numerical equation is therefore $(1\ \mathrm{s})dV_C/dt+V_C=V_S$. The seconds coefficient ensures the derivative term has voltage units.

**Read more:** Alexander and Sadiku, Ch. 7, **First-Order Circuits**; Ogata, Ch. 2, **Mathematical Modeling of Control Systems**.

## Step 3: Use Laplace Transforms and Transfer Functions

The Laplace transform turns differential equations into algebraic equations in $s$. A transfer function is the output-to-input ratio in the Laplace domain, assuming zero initial conditions. For example, $\mathcal{L}\{dx/dt\}=sX(s)-x(0^-)$ and a step of amplitude $A$ has transform $A/s$.

The transform makes it easier to combine system blocks and analyze responses. A transfer function describes the plant's input-output behavior for zero initial conditions; it does not include nonlinear saturation, noise, or component variation.

**Worked example:** with $V_C(0)=0$, transform the RC equation:

$$
RCsV_C(s)+V_C(s)=V_S(s)
$$

Divide by the input to obtain:

$$
G(s)=\frac{V_C(s)}{V_S(s)}=\frac{1}{RCs+1}=\frac{1}{s+1}
$$

The low-frequency or DC gain is 1: after transients settle, the capacitor voltage approaches the source voltage.

**Read more:** Ogata, Ch. 2, **Mathematical Modeling of Control Systems**.

## Step 4: Find Poles and Predict a Step Response

Poles are roots of the transfer-function denominator. For a first-order system the pole sets the exponential response rate; a negative real pole produces a decaying transient.

The response to a step helps interpret a model in the time domain. The time constant $\tau$ is the time to reach 63.2% of the total change; it is the reciprocal of the magnitude of the first-order pole.

**Worked example:** the RC pole is $s=-1/(RC)=-1\ \mathrm{s^{-1}}$, so $\tau=RC=1\ \mathrm{s}$. For a 3.3 V step:

$$
V_C(s)=\frac{3.3}{s(s+1)}
\quad\Longrightarrow\quad
V_C(t)=3.3\left(1-e^{-t/(1\,\mathrm{s})}\right)\ \mathrm{V}
$$

| Time | Predicted $V_C$ |
|---:|---:|
| $1\tau=1\ \mathrm{s}$ | $2.09\ \mathrm{V}$ (63.2% of final value) |
| $3\tau=3\ \mathrm{s}$ | $3.14\ \mathrm{V}$ (95.0%) |
| $5\tau=5\ \mathrm{s}$ | $3.28\ \mathrm{V}$ (99.3%) |

**Read more:** Ogata, Ch. 5, **Transient and Steady-State Response Analysis**; Alexander and Sadiku, Ch. 7, **First-Order Circuits**.

## Step 5: Recognise a Second-Order System

Two energy-storage elements often produce a second-order model. Its standard form is:

$$
G(s)=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}
$$

$\omega_n$ is natural frequency and $\zeta$ is damping ratio. Natural frequency sets the characteristic speed of the response; damping describes how quickly oscillations decay. If $\zeta<1$, the response is underdamped and rings; $\zeta=1$ is critically damped; $\zeta>1$ is overdamped.

**Worked RLC example:** for a series RLC circuit measured across its capacitor, use $R=100\ \Omega$, $L=0.1\ \mathrm{H}$, and $C=10^{-7}\ \mathrm{F}$:

$$
\omega_n=\frac{1}{\sqrt{LC}}=10\,000\ \mathrm{rad/s},\qquad
\zeta=\frac{R}{2}\sqrt{\frac{C}{L}}=0.05
$$

Since $\zeta<1$, expect ringing. The damped frequency is $\omega_d=\omega_n\sqrt{1-\zeta^2}\approx9987\ \mathrm{rad/s}$, or about $1590\ \mathrm{Hz}$.

**Read more:** Alexander and Sadiku, Ch. 8, **Second-Order Circuits**; Ogata, Ch. 5, **Transient and Steady-State Response Analysis**.

## Step 6: Estimate a Model from Measurements

**System identification** uses measured input-output data to estimate a model. First choose a plausible model structure, then apply a known input and record the response. For $G(s)=K/(\tau s+1)$, estimate $K$ from the steady-state output change divided by the input change. Estimate $\tau$ as the time to reach 63.2% of the total output change after a step. Finally compare the model with the measured curve; fitting one point alone is not model validation.

**Worked example:** for the RC plant, a 3.3 V input step produces a final 3.3 V output, so $K=3.3/3.3=1$. The output reaches about 2.09 V at 1 s, which is 63.2% of its total change; estimate $\tau\approx1\ \mathrm{s}$. Compare the complete predicted curve with measurements to check whether the model is adequate.

**Read more:** Ogata, Ch. 2, **Mathematical Modeling of Control Systems**, and Ch. 5, **Transient and Steady-State Response Analysis**.

## Step 7: Close the Feedback Loop

Feedback measures the output and uses its difference from the desired reference to correct the plant. The error is $e(t)=r(t)-y(t)$. Sensor gain matters: the unity-feedback formula is valid only when the feedback path is modeled as $H(s)=1$. For controller $C(s)$, plant $G(s)$, and sensor $H(s)$, the reference-to-output transfer function is:

$$
T(s)=\frac{C(s)G(s)}{1+C(s)G(s)H(s)}
$$

For unity feedback, $H(s)=1$. A proportional controller uses $C(s)=K_p$.

**Worked P-control example:** let $G(s)=1/(s+1)$, $K_p=2$, and reference $r=3.3\ \mathrm{V}$. Then:

$$
T(s)=\frac{2}{s+3}
$$

The DC gain is $T(0)=2/3$. Thus $y(\infty)=2.2\ \mathrm{V}$ and steady-state error is $e_{ss}=3.3-2.2=1.1\ \mathrm{V}$. The closed-loop pole is $-3\ \mathrm{s^{-1}}$.

**Read more:** Ogata, Ch. 6, **Control Systems and Control Systems Components**, and Ch. 7, **Basic Control Actions and Response**.

## Step 8: Understand P, PI, and PID

P reacts to present error, I accumulates persistent error, and D reacts to how quickly the error changes. Combining them lets the designer trade response speed, accuracy, overshoot, and noise sensitivity.

| Controller | Equation | Main effect | Main caution |
|---|---|---|---|
| P | $u=K_p e$ | Corrects present error | Can leave step error; high gain can cause overshoot or instability |
| PI | $u=K_p e+K_i\int e\,dt$ | Accumulated error can remove step error | Integral windup during saturation |
| PID | $u=K_p e+K_i\int e\,dt+K_d\,de/dt$ | Derivative action can shape transient response | Amplifies noise and can kick on reference steps |

In the usual unity-feedback classification, P-only control is type 0; adding one integrator makes the loop type 1. A type 1 loop has zero step-reference error only if stable and not prevented from reaching the target by saturation. Practical PID controllers filter derivative action and may differentiate the measured output instead of the reference.

**Read more:** Ogata, Ch. 7, **Basic Control Actions and Response**, and Ch. 8, **Analysis and Design of Feedback Control Systems**.

## Step 9: Describe Transient Performance and Frequency Response

Time-domain measures summarize how a system responds to a step: rise time describes how quickly the response approaches its target, overshoot is the amount it exceeds the final value, and settling time is when it stays within a chosen band, often 2%. Frequency response instead describes how the system treats sinusoidal inputs at different frequencies; magnitude is gain and phase is the output's phase shift relative to the input.

**Read more:** Ogata, Ch. 5, **Transient and Steady-State Response Analysis**; Ch. 8, **Analysis and Design of Feedback Control Systems**.

For a standard underdamped second-order response:

$$
M_p=100e^{-\zeta\pi/\sqrt{1-\zeta^2}}\ \%,\qquad
t_s\approx\frac{4}{\zeta\omega_n}\quad\text{(2% estimate)}
$$

**Worked transient example:** with $\zeta=0.5$ and $\omega_n=10\ \mathrm{rad/s}$, estimated overshoot is 16.3% and settling time is 0.8 s. Zeros, delay, saturation, and filtering can change measured performance.

Frequency response describes how sinusoidal inputs at different frequencies are amplified or attenuated and phase-shifted. For the RC plant:

$$
|G(j\omega)|=\frac{1}{\sqrt{1+(\omega RC)^2}},\qquad
\angle G(j\omega)=-\tan^{-1}(\omega RC)
$$

**Worked Bode example:** with $RC=1\ \mathrm{s}$, $f_c=1/(2\pi RC)=0.159\ \mathrm{Hz}$. At $\omega_c=1\ \mathrm{rad/s}$, magnitude is 0.707 ($-3\ \mathrm{dB}$) and phase is $-45^\circ$. A Bode plot shows these quantities versus frequency.

## Step 10: Check Stability and Use Root Locus

For unity negative feedback, closed-loop poles solve $1+C(s)G(s)=0$. Negative-real-part poles produce decaying modes; a pole with a positive real part produces an unstable growing mode. The **root locus** plots how closed-loop poles move as controller gain changes, helping select a gain that meets stability and response goals. It is a design aid, not a substitute for checking the full model and implementation.

**Worked root-locus example:** for $G(s)=1/(s+1)$ and proportional gain $K$, the characteristic equation gives $s=-(1+K)$. Increasing $K$ from 0 to 2 moves the pole from $-1$ to $-3\ \mathrm{s^{-1}}$.

**Read more:** Ogata, Ch. 8, **Analysis and Design of Feedback Control Systems**, and Ch. 13, **Control Systems Design by Root Locus**.

Controller design starts with requirements such as rise time, overshoot, settling time, steady-state error, and disturbance rejection. Model the plant, select a controller, predict and simulate performance, then validate carefully at low power.

## Step 11: Account for Converters and Operating Points

Converter models are nonlinear because duty ratio, current, and voltage interact. A control-oriented model often averages over switching cycles and is then linearized around one operating point. This approximation describes small changes near that point; larger duty, input, or load changes can make it inaccurate, and it does not predict switching ripple by itself.

**Worked boost linearisation:** for an ideal boost converter with $V_{IN}=3.3\ \mathrm{V}$ and operating duty $D_0=0.5$:

$$
V_{o0}=\frac{V_{IN}}{1-D_0}=6.6\ \mathrm{V},\qquad
\left.\frac{\partial V_o}{\partial D}\right|_{D_0}=\frac{V_{IN}}{(1-D_0)^2}=13.2\ \mathrm{V}
$$

A small duty change $\hat d=0.01$ predicts $\hat v_o\approx0.132\ \mathrm{V}$. This is a local estimate, not a full dynamic converter model. For a buck converter, the ideal $V_o\approx D V_{in}$ relationship is a steady-state CCM result; it is not by itself the plant model needed for feedback design.

**Read more:** Ogata, Ch. 2, **Mathematical Modeling of Control Systems**; Erickson and Maksimovic, Ch. 3, **Steady-State Converter Analysis**.

## Step 12: Implement PI Control Digitally

A digital controller does not see a continuously changing signal: it samples every $T_s$ seconds and updates its output at those instants. The accumulated integral therefore depends on both the error and the sample period. One simple discrete PI implementation is:

$$
I[k]=I[k-1]+K_i e[k]T_s,\qquad u_{raw}[k]=K_p e[k]+I[k]
$$

The output command is limited to its allowed range. Sampling, ADC/PWM quantization, computation delay, sensor filtering, and noise make hardware behavior differ from a continuous model.

**Worked update:** let $K_p=2$, $K_i=5\ \mathrm{s^{-1}}$, $T_s=0.01\ \mathrm{s}$, $e[k]=0.4\ \mathrm{V}$, and $I[k-1]=0$. Then $I[k]=0.02\ \mathrm{V}$ and $u_{raw}=0.82\ \mathrm{V}$. On a 0–3.3 V command range this is about 24.8% duty.

**Windup check:** if $I[k-1]=3.2\ \mathrm{V}$ with the same positive error, the raw command becomes $4.02\ \mathrm{V}$ and is limited to $3.3\ \mathrm{V}$. Conditional integration pauses while the error pushes farther into saturation; integration resumes as the command returns to range.

ADC/PWM quantization, computation delay, sensor filtering, and noise also affect hardware behavior. **Read more:** Ogata, Ch. 7, **Basic Control Actions and Response**, and Ch. 8, **Analysis and Design of Feedback Control Systems**; see the sampled-control and implementation cautions in [Textbook Resources](Textbook_Resources.md).

## Practical Assumptions

The examples assume linear models, known parameters, and ideal sensors and actuators unless stated otherwise. Real systems add component tolerances, losses, measurement noise, sensor scaling, sampling delay, and actuator limits. Treat calculations as predictions to compare with data, not guaranteed hardware results.

## Textbook Reading Pointers

Use chapter titles if numbering differs between printings. The complete book-to-course mapping is in `Textbook_Resources.md`.

| Topic | Book sections to revisit |
|---|---|
| Modeling, transfer functions, step response | Ogata, Ch. 2 **Mathematical Modeling of Control Systems**; Ch. 5 **Transient and Steady-State Response Analysis** |
| Feedback components and P/PI/PID | Ogata, Ch. 6 **Control Systems and Control Systems Components**; Ch. 7 **Basic Control Actions and Response** |
| Steady-state error, feedback design, windup, disturbance response | Ogata, Ch. 8 **Analysis and Design of Feedback Control Systems** |
| Root locus and gain selection | Ogata, Ch. 13 **Control Systems Design by Root Locus** |
| RC/RLC circuit models | Alexander and Sadiku, Ch. 7 **First-Order Circuits**; Ch. 8 **Second-Order Circuits** |
| Buck converter operating relationships | Erickson and Maksimovic, Ch. 3 **Steady-State Converter Analysis** |

## Self-Check

1. For the RC example, give $\tau$ and the output after one time constant.
2. Is the RLC example underdamped or overdamped?
3. For the P-control example, what is the steady-state error to the 3.3 V reference?
4. What is the RC magnitude and phase at cutoff?
5. What problem does anti-windup prevent?

**Answers:** 1. $1\ \mathrm{s}$ and about $2.09\ \mathrm{V}$. 2. Underdamped. 3. $1.1\ \mathrm{V}$. 4. Magnitude 0.707 and phase $-45^\circ$. 5. Excessive integral accumulation while the actuator is saturated.