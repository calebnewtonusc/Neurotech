// Neurotech — Multi-track summer execution plans
// Track 1: Neuralink Neuroengineering (Caleb + Mark) | Jun 1 -> Aug 28, 2026
// Track 2: Zoral Continual Learning (Caleb solo) | Jun 1 -> Aug 21, 2026

const NEURALINK = {
  id: "neuralink",
  kind: "neuralink",
  name: "Neuralink — Neuroengineering",
  short: "Closed-loop control & neural decoding",
  owners: "Caleb Newton & Mark Lin",
  tagline:
    "Caleb Newton and Mark Lin. A disciplined, measurable body of work, built backward from application evidence. From neural representations to closed-loop control.",
  dateLabel: "June 1 — August 28, 2026 · 13 weeks",
  thesis:
    "From neural representations to closed-loop control: a summer portfolio in decoding, prediction, and assistive digital agency.",
  start: "2026-06-01",
  end: "2026-08-28",

  projects: [
    {
      id: "p1",
      tag: "Project 1",
      name: "Neuroadaptive Control Workstation",
      line: "A closed-loop assistive-control system that pairs low-bandwidth neuromotor input with predictive context modeling to reduce the effort of operating a digital environment.",
      proves: [
        "Real-time system design",
        "Closed-loop interaction",
        "Low-bandwidth intent decoding",
        "Human task design",
        "Latency measurement",
        "Calibration & adaptation",
        "Baseline comparison",
        "User-burden reduction",
      ],
      notClaim: [
        "Does NOT read brain activity",
        "Is NOT an implanted BCI",
        "Is NOT a medical device",
        "Is NOT Neuralink hardware",
      ],
    },
    {
      id: "p2",
      tag: "Project 2",
      name: "Neural Representation & State Decoding Lab",
      line: "A reproducible public-neural-data benchmark for decoding behavior/state, visualizing latent neural trajectories, and testing generalization across trials, sessions, subjects, or conditions.",
      proves: [
        "Python neural-data analysis",
        "Dataset ingestion & QC",
        "Baseline-first ML",
        "Neural decoding",
        "Representation learning",
        "Manifold analysis",
        "Cross-session generalization",
        "Scientific interpretation",
      ],
      notClaim: [
        "No hands-on invasive recording",
        "No private thought decoding",
        "No clinical deployment",
        "Does NOT conflate fMRI & spiking activity",
      ],
    },
  ],

  decisions: [
    {
      date: "2026-06-05",
      title: "Charter, dataset & hardware lock",
      detail:
        "Choose Project 1 primary/fallback input and the exact Project 2 primary dataset.",
    },
    {
      date: "2026-06-19",
      title: "Hardware / signal kill-switch",
      detail:
        "Continue only if input can be logged, repeated, and measured above baseline. Otherwise pivot immediately.",
    },
    {
      date: "2026-07-10",
      title: "Project 2 primary-track protection",
      detail:
        "The motor/neural-population track must stand alone before any fMRI secondary work expands.",
    },
    {
      date: "2026-07-17",
      title: "Mid-summer scope cut",
      detail: "Kill distractors and preserve the strongest final narrative.",
    },
    {
      date: "2026-08-07",
      title: "Feature freeze",
      detail:
        "Stop adding major features. Prioritize report, results, reproducibility.",
    },
    {
      date: "2026-08-14",
      title: "Results freeze",
      detail: "Freeze core metrics, figures, and approved claims.",
    },
    {
      date: "2026-08-21",
      title: "Public package freeze",
      detail: "Finish repos, report, project page, demos.",
    },
    {
      date: "2026-08-28",
      title: "Application & interview freeze",
      detail: "Finish bullets, links, mock interviews, final claim review.",
    },
  ],

  honesty: [
    "A wrist EMG/sEMG system is not a brain-reading system. EMG measures muscle activation, not cortical activity.",
    "fMRI is indirect (blood-oxygen) measurement, not single-neuron recording.",
    "Public neural-population datasets support decoding work but are NOT hands-on invasive recording experience.",
    "A closed-loop assistive demo can be BCI-inspired, but is not an implanted BCI.",
    "Do not say Project 2 is 'TRIBE v2' or that it reads thoughts. It is a student-built public-data benchmark inspired by predictive brain-response modeling.",
    "Frame fMRI work as encoding / response prediction, not mind reading.",
    "Use measured outcomes only. Never list unmeasured targets as achieved results.",
    "Never claim patient, clinical, invasive, or surgical experience unless it actually happened.",
    "State limitations clearly and maturely. Do not bury them.",
  ],

  killSwitches: [
    {
      week: 1,
      when: "End of Week 1 (June 5)",
      q: "Can we access input events programmatically, timestamp them, save logs, run a repeatable task, measure latency, and export data?",
      fail: "If no -> switch to open EMG or simulated low-bandwidth input immediately.",
    },
    {
      week: 3,
      when: "End of Week 3 (June 19)",
      q: "Above-baseline detection, 3+ repeated trials, complete timestamped logs, clear signal plots, written failure analysis?",
      fail: "If it fails -> stop chasing hardware and move to the fallback system to preserve the summer.",
    },
  ],

  deliverables: {
    p1: [
      "Public/shareable repo",
      "Runnable setup instructions",
      "Closed-loop demo",
      "Experiment protocol",
      "Baseline comparison",
      "Metrics table",
      "Latency table",
      "Repeated-session analysis",
      "Failure taxonomy",
      "Demo video",
    ],
    p2: [
      "Public/shareable repo",
      "Dataset loading instructions",
      "Preprocessing pipeline",
      "Baseline decoder suite",
      "Stronger model",
      "Latent / manifold analysis",
      "Generalization test",
      "Figure package",
      "Methods writeup",
      "Limitations writeup",
    ],
    portfolio: [
      "Project page",
      "Final technical report",
      "One-page executive summary",
      "Demo video embedded",
      "Figures embedded",
      "Reproducibility notes",
      "'What we learned' retrospective",
      "Application bullet bank",
      "Resume bullets",
      "Interview question bank",
    ],
  },

  weeks: [
    {
      num: 1,
      range: "June 1 - June 5",
      title: "Scope lock, hardware verification & dataset lock",
      objective:
        "Turn the portfolio from concept into a controlled experiment plan: two runnable repos, one locked primary dataset, and a verified Project 1 input path (or immediate fallback).",
      exit: "Locked primary hardware/fallback path, exact primary dataset, runnable repo foundations, and a claim map tied to Neuralink qualifications.",
      days: [
        {
          day: "Mon",
          date: "2026-06-01",
          theme: "Learn the role & define the evidence map",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Re-read the Neuralink Neuroengineer Intern requirements; convert every qualification into honest evidence.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Create the monorepo/paired-repo structure, Python envs, lint/format, results folders, GitHub issue board.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Draft a 1-page memo distinguishing EMG/EEG/fMRI/implanted electrophysiology, decoding, closed-loop, manifold analysis.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Write v1 of the application evidence map and the prohibited-claims list.",
            },
          ],
          proof:
            "Repos created, role-to-evidence matrix drafted, modality memo started, week_01.md opened.",
        },
        {
          day: "Tue",
          date: "2026-06-02",
          theme: "Verify Project 1 hardware paths",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Test whether Meta/wearable route allows programmatic capture, timestamping, logging, latency. Draft open-EMG fallback in parallel.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "List intentional input classes a user could reliably perform; flag physiological/fatigue concerns for each.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Score each hardware path on inspectability, repeatability, signal access, setup speed, credibility, cost.",
            },
          ],
          proof:
            "Hardware comparison table + preliminary continue-or-fallback recommendation.",
        },
        {
          day: "Wed",
          date: "2026-06-03",
          theme: "Lock Project 2 data access",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Establish a verified loader path for the Neural Latents Benchmark-style motor/population dataset; confirm storage/compute.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Read dataset docs: what was recorded, what behavior is labeled, what a trial means, valid interpretations.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Define the one primary analysis question (default: do learned reps improve held-out movement decoding vs baselines?).",
            },
          ],
          proof:
            "Dataset decision memo, verified data-access path, shapes/metadata output, initial metric definition.",
        },
        {
          day: "Thu",
          date: "2026-06-04",
          theme: "Specify both projects before building",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Draw Project 1 modules: input, preprocessing, intent decoder, context engine, fusion policy, UI, logging, dashboard.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Draft Project 1 protocol v0: task domains, input vocabulary, session length, burden survey, biases, limitations.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Lock required metrics, baselines, target figures, and file naming/logging conventions for both projects.",
            },
          ],
          proof:
            "Architecture diagram, protocol v0, metrics/figures checklist.",
        },
        {
          day: "Fri",
          date: "2026-06-05",
          theme: "Ship the charter & make the first hard decisions",
          tasks: [
            {
              p: "Together",
              k: "Ship",
              t: "Finish project charter, hardware memo, dataset memo, honesty rules, success criteria, evidence map.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "HARDWARE: choose Project 1 primary + fallback. DATASET: lock exact Project 2 primary dataset & single question.",
            },
            {
              p: "Caleb",
              k: "Teach",
              t: "Teach repos, experiment configs, reproducibility.",
            },
            {
              p: "Mark",
              k: "Teach",
              t: "Teach signal-modality differences and why overclaiming weakens the application.",
            },
          ],
          proof:
            "project_charter.md, hardware_decision_memo.md, dataset_decision_memo.md, honesty_rules.md, evidence_map.md, two repo skeletons, Week 1 report.",
        },
      ],
    },
    {
      num: 2,
      range: "June 8 - June 12",
      title: "Protocol, logging & baseline architecture",
      objective:
        "Create a runnable no-prediction baseline for Project 1 and a real data-loading + QC path for Project 2.",
      exit: "Project 1 runs in baseline mode and saves trustworthy logs. Project 2 loads real neural data and shows a structure-revealing figure.",
      days: [
        {
          day: "Mon",
          date: "2026-06-08",
          theme: "Learn experimental design & define trials",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Study baseline-first design, train/val/test separation, repeated trials, latency measurement, documenting protocol changes.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Project 1 protocol v1: two mandatory domains, trial prompts, instructions, effort questions, stopping conditions, bias controls.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Convert protocol into events, log fields, and UI states.",
            },
          ],
          proof:
            "Protocol v1, trial table, weekly hypothesis, logging schema v1.",
        },
        {
          day: "Tue",
          date: "2026-06-09",
          theme: "Build Project 1 baseline mode",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Experiment runner: session/trial IDs, event timestamping, command selection interface, no-prediction low-bandwidth mode.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Walk through the protocol like a participant; flag ambiguous prompts; refine effort-survey questions.",
            },
          ],
          proof: "Runnable baseline interface that saves a complete trial log.",
        },
        {
          day: "Wed",
          date: "2026-06-10",
          theme: "Load & inspect real Project 2 data",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Dataset loader + notebook surfacing neural shapes, behavioral labels, trial timing, missing values, split options.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Annotate the QC notebook with what each variable represents biologically and behaviorally.",
            },
            {
              p: "Together",
              k: "Build",
              t: "Produce the first dataset overview plot, even if rough.",
            },
          ],
          proof: "Data-loading notebook, QC notes, first dataset figure draft.",
        },
        {
          day: "Thu",
          date: "2026-06-11",
          theme: "Define baselines & test the logging system",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Project 1: run internal baseline test sessions; verify every log field, timestamp, undo/error event, completion record.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Project 2: implement chance/mean and linear-model baseline scaffolds.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Identify possible confounds in each baseline; define what a meaningful improvement looks like.",
            },
          ],
          proof:
            "Validated Project 1 log file, Project 2 baseline skeleton, metric definitions doc.",
        },
        {
          day: "Fri",
          date: "2026-06-12",
          theme: "Ship baseline architecture",
          tasks: [
            {
              p: "Together",
              k: "Ship",
              t: "Freeze protocol v1, command hierarchy, logging schema, baseline definitions, Project 2 benchmark plan.",
            },
            {
              p: "Caleb",
              k: "Teach",
              t: "Teach train/val/test splits and metric leakage.",
            },
            {
              p: "Mark",
              k: "Teach",
              t: "Teach how task design can accidentally produce misleading performance.",
            },
          ],
          proof:
            "Baseline demo recording, protocol v1, metric defs, P2 loading/QC notebook, benchmark plan, dataset overview figure, Week 2 report.",
        },
      ],
    },
    {
      num: 3,
      range: "June 15 - June 19",
      title: "Pilot signals, first metrics & the hardware kill-switch",
      objective:
        "Determine whether the chosen live-input path is actually good enough to support a credible measured Project 1.",
      exit: "A real plotted & measured result from each project, plus a final decision on Project 1 input. Hardware uncertainty ends here.",
      killSwitch: true,
      days: [
        {
          day: "Mon",
          date: "2026-06-15",
          theme: "Learn signal validation & launch pilot collection",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Study signal-quality checks, temporal features, calibration, class balance, latency; why above-chance is necessary but not sufficient.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Finish input collection pipeline, preprocessing hooks, event visualization, calibration session workflow.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Finalize pilot instructions, input-class definitions, session notes template.",
            },
          ],
          proof: "Pilot protocol and collection-ready system.",
        },
        {
          day: "Tue",
          date: "2026-06-16",
          theme: "Collect first Project 1 pilot sessions",
          tasks: [
            {
              p: "Together",
              k: "Build",
              t: "Run several pilot blocks; save raw/event data, timestamps, class labels, failures, comments.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Plot raw/processed input or event timing; check for missing/inconsistent logs.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Record fatigue, confusion, unreliable classes, timing problems, possible redesigns.",
            },
          ],
          proof: "Pilot session files and first signal/input behavior plots.",
        },
        {
          day: "Wed",
          date: "2026-06-17",
          theme: "Build baseline models for both projects",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Project 1: train a simple intent/event baseline; compute accuracy, confusion matrix, latency summary.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Project 2: run first simple decoding baselines on the primary dataset.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Review errors; write what the current results do and do not justify claiming.",
            },
          ],
          proof: "First quantitative metric table for each project.",
        },
        {
          day: "Thu",
          date: "2026-06-18",
          theme: "Stress-test the input path & write the decision memo",
          tasks: [
            {
              p: "Together",
              k: "Build",
              t: "Repeat pilot trials under a mild variation (different session time, recalibration, reordered tasks).",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Compare against chance/simple baselines; compute logging completeness and repeatability.",
            },
            {
              p: "Mark",
              k: "Decide",
              t: "Draft continue / modify / pivot recommendation grounded in metrics and usability.",
            },
          ],
          proof:
            "Hardware/signal decision memo draft, error taxonomy v1, updated limitations note.",
        },
        {
          day: "Fri",
          date: "2026-06-19",
          theme: "Execute the hard kill-switch",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "MANDATORY: continue only if input supports measured, repeatable use with complete logs + above-baseline. Otherwise pivot NOW.",
            },
            {
              p: "Together",
              k: "Ship",
              t: "Publish pilot results memo, P1 metrics table, P2 baseline table, signal plots, failure list, revised plan if pivoted.",
            },
            {
              p: "Caleb",
              k: "Teach",
              t: "Teach preprocessing and confusion matrices.",
            },
            {
              p: "Mark",
              k: "Teach",
              t: "Teach why signal modality and protocol reliability matter more than futuristic branding.",
            },
          ],
          proof:
            "Pilot results memo, continue-or-pivot decision, metrics tables, error taxonomy v1, Week 3 report.",
        },
      ],
    },
    {
      num: 4,
      range: "June 22 - June 26",
      title: "Refined protocol & serious baseline benchmark",
      objective:
        "Turn early pilots into a defensible baseline framework for both projects.",
      exit: "Both projects have defensible baselines. No stronger-model work begins until baseline results and weaknesses are documented.",
      days: [
        {
          day: "Mon",
          date: "2026-06-22",
          theme: "Learn calibration, reproducibility & manifold basics",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Review calibration strategies, reproducible configs, PCA/latent trajectory concepts, what a manifold plot can/cannot prove.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Update experiment configs around the final hardware/fallback decision.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Revise protocol and metric rationale based on Week 3 failure patterns.",
            },
          ],
          proof: "Protocol v2 outline and baseline benchmark test plan.",
        },
        {
          day: "Tue",
          date: "2026-06-23",
          theme: "Implement Project 1 protocol v2",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Tighten labels, calibration flow, logging, baseline control mode, error/undo tracking.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Test instructions; define how to tell user confusion from decoder error.",
            },
          ],
          proof: "Runnable protocol v2 and validated session checklist.",
        },
        {
          day: "Wed",
          date: "2026-06-24",
          theme: "Run Project 2 baseline suite",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Run 3+ baseline models on the primary dataset with saved configs and seed tracking.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Write interpretations of model differences and important dataset constraints.",
            },
          ],
          proof: "Baseline model-results table and candidate figure outputs.",
        },
        {
          day: "Thu",
          date: "2026-06-25",
          theme: "Add context-only baseline & prep figures",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Add the context-only candidate-ranking baseline; compare vs no-prediction control on scripted tasks.",
            },
            {
              p: "Together",
              k: "Build",
              t: "Select the clearest Project 1 and Project 2 plots for polishing.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Draft limitations v1 and the manifold-analysis plan.",
            },
          ],
          proof:
            "P1 baseline comparison draft, P2 figure draft, limitations v1.",
        },
        {
          day: "Fri",
          date: "2026-06-26",
          theme: "Ship the baseline report package",
          tasks: [
            {
              p: "Together",
              k: "Ship",
              t: "Deliver protocol v2, P1 baseline comparison, P2 baseline report, first polished figure, manifold plan, scope cut list.",
            },
            {
              p: "Caleb",
              k: "Teach",
              t: "Teach model configuration and seed tracking.",
            },
            {
              p: "Mark",
              k: "Teach",
              t: "Teach interpretation discipline for neural latent-space figures.",
            },
          ],
          proof:
            "Protocol v2, P2 baseline report, first publication-style figure, limitations v1, scope cut list, Week 4 report.",
        },
      ],
    },
    {
      num: 5,
      range: "June 29 - July 3",
      title: "Predictive modeling begins",
      objective:
        "Add one carefully chosen predictive component to each project and determine whether it improves the story beyond simple baselines.",
      exit: "At least one predictive component shows measurable value OR yields a well-documented failure that sharpens the design. Complexity without evidence is cut.",
      days: [
        {
          day: "Mon",
          date: "2026-06-29",
          theme: "Learn temporal/predictive model trade-offs",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Review TCN, RNN, small transformer, sequential autoencoder, latent-dynamics options at a practical level.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Project 2: select EXACTLY ONE stronger model. Project 1: specify how context ranking improves control + the proof comparison.",
            },
          ],
          proof:
            "Predictive-modeling design doc and model-selection rationale.",
        },
        {
          day: "Tue",
          date: "2026-06-30",
          theme: "Build Project 1 context engine v1",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Implement ranked candidate commands from task state + recent history; log proposed vs selected actions.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Verify rankings match sensible task behavior; flag where prediction could create burden or dangerous mistakes.",
            },
          ],
          proof: "Context engine v1 running on scripted tasks with logs.",
        },
        {
          day: "Wed",
          date: "2026-07-01",
          theme: "Train Project 2 stronger model v1",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Train the selected temporal/latent model using seeded configs and held-out evaluation.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Explain what the learned representation is designed to capture and what the metric means.",
            },
          ],
          proof: "Stronger-model results run and first latent visualization.",
        },
        {
          day: "Thu",
          date: "2026-07-02",
          theme: "Compare predictive vs simple approaches",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Compare P2 stronger model vs baselines; P1 context engine vs no-prediction/context-only where trials allow.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Draft captions and a clear failure explanation if predictive methods do not improve outcomes.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Keep, simplify, or drop any model component that adds complexity without evidence.",
            },
          ],
          proof:
            "Updated benchmark table, draft latent figure, keep-or-drop decisions.",
        },
        {
          day: "Fri",
          date: "2026-07-03",
          theme: "Ship the predictive modeling checkpoint",
          tasks: [
            {
              p: "Together",
              k: "Ship",
              t: "Complete design doc, baseline-vs-predictive comparison, first latent visualization, updated benchmark matrix.",
            },
            {
              p: "Caleb",
              k: "Teach",
              t: "Teach temporal-model choices and ablations.",
            },
            {
              p: "Mark",
              k: "Teach",
              t: "Teach what a neural trajectory interpretation can responsibly say.",
            },
          ],
          proof:
            "Predictive checkpoint report, model configs, latent viz v1, updated metrics table, Week 5 report.",
        },
      ],
    },
    {
      num: 6,
      range: "July 6 - July 10",
      title: "Make Project 2 independently strong",
      objective:
        "Build a stable, reproducible primary neural-population analysis package that could impress even without Project 1 or fMRI.",
      exit: "Project 2 stands alone as a serious, reproducible neural-data analysis project. Secondary fMRI begins only if this gate passes.",
      days: [
        {
          day: "Mon",
          date: "2026-07-06",
          theme: "Learn quality standards for a benchmark repo",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Review reproducibility, data provenance, split discipline, robust metrics, runtime reporting, clear methods writing.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Define the reproducible command sequence from data loading to final result table and figures.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Outline methods and quality-control narrative.",
            },
          ],
          proof: "Project 2 reproducibility checklist and mini-report outline.",
        },
        {
          day: "Tue",
          date: "2026-07-07",
          theme: "Stabilize ingestion & preprocessing",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Convert notebooks into stable loader/preprocessing scripts; save configs and deterministic splits.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Review QC outputs; document excluded trials, conditions, or analysis constraints.",
            },
          ],
          proof: "Stable data-ingestion pipeline and data/QC documentation.",
        },
        {
          day: "Wed",
          date: "2026-07-08",
          theme: "Run final primary baseline table",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Run the baseline suite consistently across the chosen evaluation protocol, seeds, and splits.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Write model-by-model interpretation and limitations.",
            },
          ],
          proof: "Decoder baseline table with saved runs and notes.",
        },
        {
          day: "Thu",
          date: "2026-07-09",
          theme: "Generate latent & generalization analyses",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Run latent extraction and first generalization test (held-out trials/sessions/conditions or strongest split).",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Write why this generalization test matters biologically and for neural-interface work.",
            },
          ],
          proof:
            "Latent-space figure, generalization plan/result draft, methods notes.",
        },
        {
          day: "Fri",
          date: "2026-07-10",
          theme: "Protect the primary track before optional expansion",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "MANDATORY: confirm P2 primary track satisfies the minimum-viable checklist before any NSD/fMRI or stretch work.",
            },
            {
              p: "Together",
              k: "Ship",
              t: "Publish P2 mini-report, stable pipeline, decoder baseline table, latent figure, generalization plan/result.",
            },
            { p: "Caleb", k: "Teach", t: "Teach the end-to-end pipeline." },
            {
              p: "Mark",
              k: "Teach",
              t: "Teach the data-generating experiment and biological caveats.",
            },
          ],
          proof:
            "Runnable primary pipeline, mini-report, baseline table, latent figure, generalization artifact, Week 6 report.",
        },
      ],
    },
    {
      num: 7,
      range: "July 13 - July 17",
      title: "Mid-summer review, role crossover & scope cut",
      objective:
        "Force both applicants to defend both projects, identify weak spots, and eliminate attractive distractions before the second half.",
      exit: "Each person can explain both projects credibly, and the remaining schedule contains only work that strengthens final measured proof.",
      days: [
        {
          day: "Mon",
          date: "2026-07-13",
          theme: "Audit progress against Neuralink evidence",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "Revisit the role-to-evidence map; grade every promised artifact as done, at-risk, cut, or unsupported.",
            },
            {
              p: "Caleb",
              k: "Write",
              t: "Draft the Project 2 biological interpretation presentation, not just code.",
            },
            {
              p: "Mark",
              k: "Build",
              t: "Set up an independent Project 2 pipeline run; document all errors encountered.",
            },
          ],
          proof: "Mid-summer audit table and risk list.",
        },
        {
          day: "Tue",
          date: "2026-07-14",
          theme: "Role crossover execution day",
          tasks: [
            {
              p: "Mark",
              k: "Build",
              t: "Run one full Project 2 experiment independently; modify one model/preprocessing config; interpret its metrics.",
            },
            {
              p: "Caleb",
              k: "Write",
              t: "Present dataset, recording modality, experiment structure, manifold question, and limitations without hiding behind implementation.",
            },
          ],
          proof:
            "Mark's experiment log and Caleb's interpretation notes/presentation draft.",
        },
        {
          day: "Wed",
          date: "2026-07-15",
          theme: "Review Project 1 readiness for closed-loop integration",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Refactor the highest-risk integration components; produce the closed-loop integration plan.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Reassess the protocol for live repeated-session use; identify misleading/frustrating task flows.",
            },
            {
              p: "Together",
              k: "Build",
              t: "Run the latest Project 1 baseline flow end-to-end.",
            },
          ],
          proof:
            "Integration readiness checklist and revised protocol concerns.",
        },
        {
          day: "Thu",
          date: "2026-07-16",
          theme: "Internal lab meeting & challenge assumptions",
          tasks: [
            {
              p: "Together",
              k: "Write",
              t: "Each gives a concise talk on both projects, results, failures, and the strongest remaining uncertainty.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Ask hostile reviewer questions: Where is the baseline? Why is this neural? Why useful? What did each person do? What is not proven?",
            },
          ],
          proof:
            "Mid-summer deck, reviewer-question notes, revised roadmap draft.",
        },
        {
          day: "Fri",
          date: "2026-07-17",
          theme: "Cut scope & lock the second half",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "MANDATORY: kill stretch goals that threaten P1 closed-loop, P2 reproducibility, or final packaging. fMRI optional unless already clean.",
            },
            {
              p: "Together",
              k: "Ship",
              t: "Final mid-summer deck, second-half roadmap, killed-stretch list, interview question bank v1, role-crossover checkpoint.",
            },
            {
              p: "Together",
              k: "Teach",
              t: "Use mid-summer questions; each person must accurately explain one result from the other's work.",
            },
          ],
          proof:
            "Mid-summer review package, locked second-half roadmap, cut list, Week 7 report.",
        },
      ],
    },
    {
      num: 8,
      range: "July 20 - July 24",
      title: "Closed-loop workstation v1",
      objective:
        "Turn Project 1 into a genuinely interactive measured system combining low-bandwidth input and context prediction.",
      exit: "Project 1 is now a measured interactive system, not a classifier or interface mockup.",
      days: [
        {
          day: "Mon",
          date: "2026-07-20",
          theme: "Learn closed-loop evaluation & online metrics",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Review online feedback loops, user-effort measures, correction burden, confidence-aware rejection, real-time latency reporting.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Specify integration tasks for intent decoder, context engine, UI, execution, logger.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Finalize live-session flow, effort survey, failure observation sheet.",
            },
          ],
          proof:
            "Closed-loop implementation checklist and v1 evaluation protocol.",
        },
        {
          day: "Tue",
          date: "2026-07-21",
          theme: "Integrate the live system",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Connect input/decoded actions to ranked candidates, confirm/reject/next/undo logic, live UI, complete event logging.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Test usability; record points of ambiguity or burden.",
            },
          ],
          proof: "Closed-loop system capable of completing scripted tasks.",
        },
        {
          day: "Wed",
          date: "2026-07-22",
          theme: "Run closed-loop sessions",
          tasks: [
            {
              p: "Together",
              k: "Build",
              t: "Run baseline and predictive-condition trials using the same tasks wherever possible.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Capture completion time, input events, errors, corrections, latency, throughput.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Capture effort, frustration, adaptation, task-design issues.",
            },
          ],
          proof: "Closed-loop logs and preliminary comparison data.",
        },
        {
          day: "Thu",
          date: "2026-07-23",
          theme: "Analyze & repair the weak links",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Compute no-prediction vs predictive results; isolate the greatest latency/error driver; repair ONE high-leverage weakness.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Update failure taxonomy and user-flow evaluation.",
            },
          ],
          proof: "Preliminary comparison table, latency table, repair notes.",
        },
        {
          day: "Fri",
          date: "2026-07-24",
          theme: "Ship closed-loop demo v1",
          tasks: [
            {
              p: "Together",
              k: "Ship",
              t: "Record a clean internal demo; publish no-prediction vs predictive comparison, latency table, user-burden table, demo script v1.",
            },
            {
              p: "Caleb",
              k: "Teach",
              t: "Teach fusion-policy and logging choices.",
            },
            {
              p: "Mark",
              k: "Teach",
              t: "Teach how online interaction changes interpretation of performance metrics.",
            },
          ],
          proof:
            "Closed-loop demo v1, metrics comparison, latency/user-burden tables, failure update, Week 8 report.",
        },
      ],
    },
    {
      num: 9,
      range: "July 27 - July 31",
      title: "Robustness, repeat sessions & generalization",
      objective:
        "Demonstrate whether the strongest results survive repeated sessions and honest generalization tests.",
      exit: "The team has evidence about repeatability and knows exactly which quantitative claims are safe to use externally.",
      days: [
        {
          day: "Mon",
          date: "2026-07-27",
          theme: "Learn robustness & uncertainty analysis",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Review session drift, recalibration, confidence calibration, held-out evaluation, seed variation, failure-taxonomy writing.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Specify repeated-session P1 analysis and final P2 generalization experiment.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Define how to interpret fatigue, drift, and failure without overstating causes.",
            },
          ],
          proof: "Robustness experiment plan and hypotheses.",
        },
        {
          day: "Tue",
          date: "2026-07-28",
          theme: "Run Project 1 repeated-session block one",
          tasks: [
            {
              p: "Together",
              k: "Build",
              t: "Collect a new P1 session using the locked protocol, both baseline and combined modes.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Save calibration timing, metrics, logs, hardware/software version.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Record session differences and effort notes.",
            },
          ],
          proof: "Session data and daily metric summary.",
        },
        {
          day: "Wed",
          date: "2026-07-29",
          theme: "P1 repeated-session block two & P2 generalization",
          tasks: [
            {
              p: "Together",
              k: "Build",
              t: "Collect another P1 session or repeat the highest-value condition.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Project 2: execute the locked generalization test; save all results/configs.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Identify whether variation changes the claim or only the limitation language.",
            },
          ],
          proof:
            "Repeated-session dataset and Project 2 generalization outputs.",
        },
        {
          day: "Thu",
          date: "2026-07-30",
          theme: "Analyze robustness & finalize failure taxonomy",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Generate cross-session plots, calibration comparisons, confidence/error analyses, P2 generalization figure.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Complete failure taxonomy and updated limitations for both projects.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Revise application evidence map using only metrics that now survive scrutiny.",
            },
          ],
          proof:
            "Robustness plots, generalization report draft, evidence-map revision.",
        },
        {
          day: "Fri",
          date: "2026-07-31",
          theme: "Ship the defensibility package",
          tasks: [
            {
              p: "Together",
              k: "Ship",
              t: "Deliver P1 repeated-session report, P2 generalization report, failure taxonomy, updated limitations, revised evidence map.",
            },
            {
              p: "Caleb",
              k: "Teach",
              t: "Teach robustness plots and calibration.",
            },
            {
              p: "Mark",
              k: "Teach",
              t: "Teach the difference between a repeatable result, a promising observation, and an unsupported story.",
            },
          ],
          proof:
            "Robustness/generalization package, failure taxonomy, claims review, Week 9 report.",
        },
      ],
    },
    {
      num: 10,
      range: "Aug 3 - Aug 7",
      title: "Flagship figures, optional fMRI bridge & feature freeze",
      objective:
        "Select the final story, make the strongest figures report-ready, and freeze major feature development.",
      exit: "The final evidence exists. Remaining work is documentation, verification, communication, and packaging, not invention.",
      days: [
        {
          day: "Mon",
          date: "2026-08-03",
          theme: "Learn technical storytelling & decide the fMRI bridge",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Review strong methods/results narrative, figure selection, caption quality, responsible fMRI response-prediction framing.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Secondary track: only begin/retain a small NSD/fMRI figure if P2 primary + P1 closed-loop are secure. Otherwise formally cut it.",
            },
          ],
          proof:
            "Final story outline, flagship figure list, explicit fMRI include-or-cut decision.",
        },
        {
          day: "Tue",
          date: "2026-08-04",
          theme: "Produce final Project 1 plots",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Generate final P1 plots: baseline vs combined, latency, input burden, correction/error rate, repeated sessions.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Audit captions and interpretation for overclaims or missing limitations.",
            },
          ],
          proof: "Final Project 1 figure candidates and captions.",
        },
        {
          day: "Wed",
          date: "2026-08-05",
          theme: "Produce final Project 2 plots & optional secondary result",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Generate final baseline/model comparison, latent/manifold figure, generalization figure.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Optional only if allowed: one clean fMRI encoding/representation result, not a new open-ended project.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Write results interpretations and modality-specific limitations.",
            },
          ],
          proof:
            "Final Project 2 figure candidates and optional fMRI bridge artifact or documented cut.",
        },
        {
          day: "Thu",
          date: "2026-08-06",
          theme: "Build the narrative & verify reproducibility",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Run the reproducibility command sequence; note runtime, expected outputs, manual steps.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Draft discussion and limitations sections around flagship evidence.",
            },
            {
              p: "Together",
              k: "Write",
              t: "Write application bullets v1 using actual metrics only.",
            },
          ],
          proof:
            "Figure set v1, report narrative v1, reproducibility notes, bullet draft v1.",
        },
        {
          day: "Fri",
          date: "2026-08-07",
          theme: "Freeze features",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "MANDATORY: no major new models/datasets/hardware/UI after today unless repairing a documented reproducibility failure.",
            },
            {
              p: "Together",
              k: "Ship",
              t: "Final figure set v1, summer narrative v1, application bullets v1, demo storyboard, README outline, feature-freeze memo.",
            },
            {
              p: "Caleb",
              k: "Teach",
              t: "Teach reproducible release workflow.",
            },
            {
              p: "Mark",
              k: "Teach",
              t: "Teach how limitations increase rather than reduce credibility.",
            },
          ],
          proof: "Feature-freeze package and Week 10 report.",
        },
      ],
    },
    {
      num: 11,
      range: "Aug 10 - Aug 14",
      title: "Full report, demo draft & results freeze",
      objective:
        "Convert the measured work into complete external-facing artifacts and freeze the claims that appear in applications.",
      exit: "Every outward-facing quantitative claim is backed by a frozen result and can be defended by both applicants.",
      days: [
        {
          day: "Mon",
          date: "2026-08-10",
          theme:
            "Learn concise technical communication & divide report ownership",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Review report structure, concise bullet writing, demo narration, skeptical-reviewer expectations.",
            },
            {
              p: "Caleb",
              k: "Write",
              t: "Own: methods, architecture, implementation, metrics, reproducibility sections.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Own: introduction, neuroscience framing, results interpretation, limitations, relevance sections.",
            },
          ],
          proof:
            "Full report outline with assigned sections and claim checklist.",
        },
        {
          day: "Tue",
          date: "2026-08-11",
          theme: "Write systems & methods sections",
          tasks: [
            {
              p: "Caleb",
              k: "Write",
              t: "Complete P1 system architecture & methods, P2 implementation/methods, setup documentation.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Ensure methods correctly describe modality, experimental design, analysis scope.",
            },
          ],
          proof:
            "Draft technical-methods half of report and updated repo docs.",
        },
        {
          day: "Wed",
          date: "2026-08-12",
          theme: "Write scientific story & record demo draft",
          tasks: [
            {
              p: "Mark",
              k: "Write",
              t: "Complete background, interpretation, limitations, future work, Neuralink relevance sections.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Produce a first full P1 demo recording and visual walkthrough of P2 figures.",
            },
            {
              p: "Together",
              k: "Write",
              t: "Flag unclear claims, distracting sections, missing metric context.",
            },
          ],
          proof: "Full report draft and demo draft.",
        },
        {
          day: "Thu",
          date: "2026-08-13",
          theme: "Tighten the evidence & application language",
          tasks: [
            {
              p: "Together",
              k: "Write",
              t: "Revise full report, captions, portfolio copy, resume bullets, exceptional-ability bullets.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "Re-run final metric-generating commands; ensure tables/plots match report values.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Conduct claims and limitations audit against data and modalities.",
            },
          ],
          proof: "Final-metrics candidate set and application text v2.",
        },
        {
          day: "Fri",
          date: "2026-08-14",
          theme: "Freeze results & approved claims",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "MANDATORY: freeze core metrics, figures, model comparisons, allowed claims. New analysis may fix errors, not change the story.",
            },
            {
              p: "Together",
              k: "Ship",
              t: "Full report draft, portfolio copy, resume bullets, exceptional-ability bullets, demo draft, results-freeze memo.",
            },
            {
              p: "Together",
              k: "Teach",
              t: "Both explain every externally used metric and the exact limitations of each project.",
            },
          ],
          proof: "Results-freeze package and Week 11 report.",
        },
      ],
    },
    {
      num: 12,
      range: "Aug 17 - Aug 21",
      title: "Final polish & public package freeze",
      objective:
        "Create reviewer-ready repos, reports, videos, and project-page materials that are clear in five minutes and inspectable in thirty.",
      exit: "A reviewer can see a clear demo, inspect reproducible work, understand the scientific story, and trust the claims.",
      days: [
        {
          day: "Mon",
          date: "2026-08-17",
          theme: "Outside-reviewer usability audit",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "Pretend you've never seen it. Test whether READMEs, setup, figures, demo narrative, and claims are immediately understandable.",
            },
            {
              p: "Caleb",
              k: "Build",
              t: "List broken setup/reproduction steps and repo cleanup items.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "List confusing scientific explanations, captions, or limitation gaps.",
            },
          ],
          proof: "Public-package QA checklist.",
        },
        {
          day: "Tue",
          date: "2026-08-18",
          theme: "Finalize repositories & reproducibility",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Clean repos, configs, dependencies, scripts, results paths, README setup, reproducibility commands, screenshots.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Confirm dataset provenance, methods clarity, glossary, and limitations are present.",
            },
          ],
          proof: "Release-candidate repos and reproduction log.",
        },
        {
          day: "Wed",
          date: "2026-08-19",
          theme: "Record final demos & finish report",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Record final P1 demo and P2 visual walkthrough with approved metrics and story.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Finish final report prose, captions, glossary, concise executive summary.",
            },
          ],
          proof: "Final video candidates and report release candidate.",
        },
        {
          day: "Thu",
          date: "2026-08-20",
          theme: "Assemble project page & application packet",
          tasks: [
            {
              p: "Caleb",
              k: "Build",
              t: "Assemble/deploy the project page: demo, figures, report link, repos, reproducibility instructions.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Assemble final narrative, figures, report PDF/markdown, technical summary.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Check every link, number, caption, and claim.",
            },
          ],
          proof:
            "Public-facing package candidate and application packet candidate.",
        },
        {
          day: "Fri",
          date: "2026-08-21",
          theme: "Freeze the public package",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "MANDATORY: freeze final repos, report, demo video, project page, figure package, benchmark package, retrospective draft.",
            },
            {
              p: "Together",
              k: "Ship",
              t: "Make all reviewer-facing materials available; archive the exact versions used for applications.",
            },
            {
              p: "Together",
              k: "Teach",
              t: "Each conducts the other's five-minute walkthrough and answers skepticism questions.",
            },
          ],
          proof:
            "Final public package, public-package freeze memo, Week 12 report.",
        },
      ],
    },
    {
      num: 13,
      range: "Aug 24 - Aug 28",
      title: "Application freeze & interview defense",
      objective:
        "Stop building. Turn the completed work into strong, concise, defensible application evidence and interview readiness.",
      exit: "Both applicants can submit a concise evidence-backed application and defend every technical and scientific claim without notes.",
      days: [
        {
          day: "Mon",
          date: "2026-08-24",
          theme: "Finalize individual evidence portfolios",
          tasks: [
            {
              p: "Together",
              k: "Learn",
              t: "Review what makes an exceptional-ability example concise, quantitative, technically detailed, and honest.",
            },
            {
              p: "Caleb",
              k: "Write",
              t: "Finalize 3-4 exceptional-ability examples, resume bullets, project links, personal ownership explanation.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Finalize 3-4 exceptional-ability examples, resume bullets, project links, personal ownership explanation.",
            },
          ],
          proof: "Individual application evidence packets v1.",
        },
        {
          day: "Tue",
          date: "2026-08-25",
          theme: "Run technical mock interviews",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "Each answers questions on architecture, data, baselines, metrics, failures, generalization, modalities, relevance.",
            },
            {
              p: "Caleb",
              k: "Write",
              t: "Defend biological interpretation and limitations of Project 2.",
            },
            {
              p: "Mark",
              k: "Write",
              t: "Defend implementation, model evaluation, and reproducibility in both projects.",
            },
          ],
          proof: "Technical mock-interview notes and weak-answer repair list.",
        },
        {
          day: "Wed",
          date: "2026-08-26",
          theme: "Conduct hostile claim review",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "Challenge every bullet: What is the denominator? Baseline? What did you own? Is the modality named accurately? Reproducible?",
            },
            {
              p: "Together",
              k: "Write",
              t: "Remove weak/inflated wording; replace with clear measured language.",
            },
          ],
          proof:
            "Claim-audited application text and final allowed-claims sheet.",
        },
        {
          day: "Thu",
          date: "2026-08-27",
          theme: "Final application & link test",
          tasks: [
            {
              p: "Together",
              k: "Build",
              t: "Assemble final resume, exceptional-ability responses, portfolio link, GitHub/demo/report links, cover-note material.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Test every URL, inspect every repo from a fresh browser session, rehearse a 2-minute overview.",
            },
          ],
          proof: "Application-ready folder and final interview one-pager.",
        },
        {
          day: "Fri",
          date: "2026-08-28",
          theme: "Freeze & defend",
          tasks: [
            {
              p: "Together",
              k: "Decide",
              t: "Archive the final application packet, public links, report, demos, retrospective.",
            },
            {
              p: "Together",
              k: "Teach",
              t: "Each completes one final no-notes explanation of both projects and answers the 14 interview drill questions.",
            },
            {
              p: "Together",
              k: "Decide",
              t: "Final claim review: no brain reading, implanted BCI, invasive recording, clinical deployment, or unbacked metrics.",
            },
          ],
          proof:
            "Final application packet, interview notes, completed retrospective, Week 13 closeout report.",
        },
      ],
    },
  ],
};

// === Track 2: Zoral — Continual Learning (injected) ===
const ZORAL = {
  id: "zoral",
  kind: "zoral",
  name: "Zoral — Continual Learning",
  short: "Continual Learning & Neural Memory",
  tagline:
    "Becoming the engineer who can take Aryaa's most ambitious claim, translate it into a concrete architecture, build the experiment that tests it, measure whether it actually works, and tell the truth about the result.",
  thesis:
    "Continual learning + neural memory architectures + mechanistic interpretability + evaluation for brain-inspired autonomous agents.",
  start: "2026-06-01",
  end: "2026-08-21",
  dateLabel: "June 1 — August 21, 2026 · 12 weeks",
  projects: [
    {
      tag: "Project 1",
      name: "Continual Learning Benchmark Harness",
      line: "A benchmark suite that puts a small language or action model through sequential tasks and measures exactly how it learns and forgets across methods.",
      proves: [
        "Quantifies forgetting rate, forward transfer, and backward transfer on sequential tasks",
        "Tracks the real costs: runtime, parameter growth, and memory usage",
        "Surfaces concrete failure cases rather than just aggregate scores",
        "Compares naive fine-tuning, replay, LoRA updates, adapter memory, and an online memory module head to head",
        "Establishes the measurement foundation the entire thesis depends on: learning without degradation",
      ],
      notClaim: [
        "Not a frontier model and makes no SOTA claims",
        "Small-scale by design",
        "Results describe relative method behavior, not absolute performance ceilings",
      ],
    },
    {
      tag: "Project 2",
      name: "Brain-Inspired Memory Adapter",
      line: "A frozen small transformer paired with a trainable online memory module that queries, takes feedback, selectively updates, replays, and consolidates.",
      proves: [
        "Normal inference (Query) and correction-driven learning (Feedback) coexist in one system",
        "Selective update touches only memory components strongly implicated by a correction",
        "A replay buffer and consolidation cycle work together to retain old knowledge",
        "A forgetting test validates retention after new learning",
        "A working miniature of the continual-learning core Zoral aims for",
      ],
      notClaim: [
        "Not Zoral itself; a miniature core",
        "Base model is frozen, not trained from scratch",
        "Not frontier-scale training",
      ],
    },
    {
      tag: "Project 3",
      name: "Sleep Consolidation Ablation Study",
      line: "An ablation that tests whether a 'sleep' consolidation step actually helps continual learning, or just adds cost.",
      proves: [
        "Isolates the effect of consolidation by comparing online-only, online+replay, online+pruning, and online+replay+pruning+consolidation",
        "Measures new-task adaptation against old-task retention",
        "Tracks generalization, storage growth, and runtime across configurations",
        "Produces empirical evidence for or against the consolidation hypothesis instead of assuming it works",
      ],
      notClaim: [
        "A brain-inspired analogy, not a claim about biological sleep",
        "Empirical ablation only; no neuroscience claim",
        "Findings are scoped to the tested setup",
      ],
    },
    {
      tag: "Project 4",
      name: "Memory Interpretability Probe",
      line: "After adding new memories, this probe investigates where they live inside the model and whether they distort what was already there.",
      proves: [
        "Locates which layers encode newly added information",
        "Tests whether similar memories cluster and whether corrections move representations",
        "Checks whether old concepts get distorted or false associations form",
        "Combines linear probes, activation similarity, PCA/UMAP, activation patching, and adapter ablations for triangulated evidence",
      ],
      notClaim: [
        "Probes are correlational, not causal proof",
        "Not full mechanistic proof",
        "Requires honest baselines to interpret any signal",
      ],
    },
    {
      tag: "Project 5",
      name: "Safe Continually Learning Desktop Agent",
      line: "A narrow desktop agent that watches demonstrations, predicts next steps, accepts corrections, and improves on the same workflow under strict safety gates.",
      proves: [
        "Learns a workflow from demonstration and improves through human correction",
        "Logs every action and requires human approval for anything risky",
        "Stays inside safe tasks: renaming and sorting files, extracting structured info from local docs, formatting spreadsheet entries, a toy sandbox browser form",
        "Demonstrates continual learning applied to a real interactive loop without consequential autonomy",
      ],
      notClaim: [
        "Not autonomous over consequential actions",
        "Consent-based, sandboxed, and safety-gated",
        "Explicitly does NOT touch email, accounts, banking, hiring, legal, or identity impersonation",
      ],
    },
  ],
  weeks: [
    {
      num: 1,
      range: "June 1 - June 12",
      title: "Transformer & PyTorch depth",
      objective:
        "Build deep working fluency with PyTorch and transformer internals by implementing them from scratch.",
      exit: "A clean repo trains a tiny language model and runs a LoRA adaptation with documented architecture notes and evaluation plots.",
      groups: [
        {
          label: "Learn",
          items: [
            "PyTorch training loops",
            "Embeddings",
            "Attention",
            "Transformer blocks",
            "LoRA",
            "Evaluation",
          ],
        },
        {
          label: "Build",
          items: [
            "Small transformer from scratch",
            "Tiny language-model training run",
            "LoRA adaptation experiment",
          ],
        },
        {
          label: "Read",
          items: [
            "Attention Is All You Need",
            "LoRA paper",
            "A clear transformer implementation walkthrough",
          ],
        },
        {
          label: "Output",
          items: [
            "Clean repo",
            "Architecture notes",
            "Training and evaluation plots",
          ],
        },
      ],
    },
    {
      num: 2,
      range: "June 15 - June 26",
      title: "Continual learning fundamentals",
      objective:
        "Understand catastrophic forgetting and the core methods that trade off stability against plasticity.",
      exit: "Forgetting curves and a failure taxonomy show which method best retains knowledge across a sequential task benchmark.",
      groups: [
        {
          label: "Learn",
          items: [
            "Catastrophic forgetting",
            "Replay",
            "EWC (Elastic Weight Consolidation)",
            "Sequential evaluation",
            "Stability vs plasticity",
          ],
        },
        {
          label: "Build",
          items: [
            "Sequential task benchmark",
            "Naive fine-tune baseline",
            "Replay baseline",
            "Adapter-only baseline",
          ],
        },
        {
          label: "Output",
          items: [
            "Forgetting curves",
            "Written failure taxonomy",
            "Short report on which method retains knowledge best",
          ],
        },
      ],
    },
    {
      num: 3,
      range: "June 29 - July 10",
      title: "Modern memory architectures",
      objective:
        "Implement simplified modern memory architectures and attach an online memory module to a frozen base model.",
      exit: "A memory architecture comparison reports performance, forgetting, memory cost, and latency under a fixed memory size.",
      groups: [
        {
          label: "Learn",
          items: [
            "Read and implement simplified versions of Gated DeltaNet, Test-Time Training layers, Titans, delta-mem, HeLa-Mem, and Engram",
          ],
        },
        {
          label: "Build",
          items: [
            "Frozen base model plus online memory module",
            "Update mechanism from correction signals",
            "Fixed-memory-size experiment",
          ],
        },
        {
          label: "Output",
          items: [
            "Memory architecture comparison",
            "Metrics for performance, forgetting, memory cost, and latency",
          ],
        },
      ],
    },
    {
      num: 4,
      range: "July 13 - July 24",
      title: "Neuroscience-to-architecture translation",
      objective:
        "Translate brain-inspired memory and consolidation principles into concrete architectural mechanisms.",
      exit: "A consolidation experiment and a biology-to-ML design document state clearly which brain-inspired ideas helped and which did not.",
      groups: [
        {
          label: "Learn",
          items: [
            "Hebbian learning",
            "Synaptic tagging",
            "Reward prediction error",
            "Episodic/semantic/procedural memory",
            "Sleep consolidation",
            "Predictive processing",
          ],
        },
        {
          label: "Build",
          items: [
            "Selective memory tagging mechanism",
            "Consolidation phase",
            "Pruning/replay ablation",
          ],
        },
        {
          label: "Output",
          items: [
            '"Biology to ML" design document',
            "Consolidation experiment results",
            "Clear statement of which brain-inspired ideas helped and which did not",
          ],
        },
      ],
    },
    {
      num: 5,
      range: "July 27 - August 7",
      title: "Mechanistic interpretability",
      objective:
        "Use interpretability tools to locate and characterize where an online-learned memory lives inside a model.",
      exit: 'An interpretability notebook and report titled "Where does an online-learned memory live?" present before/after probes and representation drift.',
      groups: [
        {
          label: "Learn",
          items: [
            "Residual streams",
            "Linear probes",
            "Activation patching",
            "Sparse autoencoders",
            "Natural Language Autoencoders",
          ],
        },
        {
          label: "Build",
          items: [
            "Activation extraction from a small open model",
            "Layer-by-layer probes",
            "Before/after memory-update comparison",
            "Representation drift study",
          ],
        },
        {
          label: "Output",
          items: [
            "Visualizations",
            "Interpretability notebook",
            'Report titled "Where does an online-learned memory live?"',
          ],
        },
      ],
    },
    {
      num: 6,
      range: "August 10 - August 21",
      title: "Agent integration",
      objective:
        "Integrate the memory module into a narrow desktop agent with a prediction-and-correction loop and full evaluation.",
      exit: "A working demo, repo, video, and writeup ship, plus a concise message to Aryaa describing an actual result rather than mere interest.",
      groups: [
        {
          label: "Learn",
          items: [
            "Computer-use agents",
            "Screen/event logging",
            "Tool safety",
            "Human approval gates",
            "Behavioral evaluation",
          ],
        },
        {
          label: "Build",
          items: [
            "Narrow desktop workflow agent",
            "Demonstration capture",
            "Prediction and correction loop",
            "Memory module integration",
            "Full evaluation suite",
          ],
        },
        {
          label: "Output",
          items: [
            "Working demo",
            "GitHub repository",
            "3-5 minute technical video",
            "Technical writeup",
            "A concise message to Aryaa describing an actual result, not merely interest",
          ],
        },
      ],
    },
  ],
  sections: [
    {
      type: "tiers",
      title: "The knowledge stack",
      intro:
        "Seven tiers of capability. Build depth bottom-up; each tier ends in a concrete deliverable.",
      items: [
        {
          label: "Tier 1",
          title: "Mathematical foundation",
          points: [
            "Linear algebra (vectors, matrices, tensor shapes, dot products, eigenvalues, SVD, PCA, low-rank approximations)",
            "Probability & statistics (conditional probability, expectation, variance, MLE, cross-entropy, calibration, confidence intervals, hypothesis testing)",
            "Calculus & optimization (gradients, chain rule, backprop, SGD, Adam, regularization, gradient clipping, stability)",
            "Information theory (entropy, KL divergence, mutual information, surprise / prediction error)",
          ],
          deliverable:
            "Implement linear regression, logistic regression, PCA, an MLP, and a tiny attention layer in NumPy before relying on PyTorch.",
        },
        {
          label: "Tier 2",
          title: "Deep learning & transformers",
          points: [
            "PyTorch fluency",
            "backprop & training loops",
            "tokenization & embeddings",
            "self-attention",
            "positional encoding & RoPE",
            "transformer blocks",
            "residual streams",
            "LayerNorm & RMSNorm",
            "fine-tuning & LoRA",
            "sequence evaluation & ablations",
          ],
          deliverable:
            "Build a small transformer LM from scratch, train it, then add LoRA adapters and compare adaptation behavior.",
        },
        {
          label: "Tier 3",
          title: "Continual learning",
          points: [
            "catastrophic forgetting",
            "replay-based learning",
            "regularization-based learning",
            "architecture-based learning",
            "dynamic expansion",
            "fast weights",
            "online learning",
            "continual evaluation metrics",
            "stability-plasticity tradeoffs",
            "sequential-task benchmarking",
          ],
          deliverable:
            "Train on sequential tasks comparing naive fine-tune, replay, EWC, LoRA-only, and an expandable memory module; report forgetting curves, transfer, runtime, memory cost, failure analysis.",
        },
        {
          label: "Tier 4",
          title: "Neural memory architectures",
          points: [
            "associative memory & Hopfield networks",
            "fast weights & delta-rule memory",
            "Gated DeltaNet",
            "Test-Time Training layers",
            "Titans",
            "delta-mem",
            "HeLa-Mem",
            "DeepSeek Engram",
          ],
          deliverable:
            "Reproduce one small memory architecture, then implement your own hybrid memory block on top of a small frozen transformer.",
        },
        {
          label: "Tier 5",
          title: "Neuroscience for the vision",
          points: [
            "neuron & synapse basics",
            "Hebbian learning",
            "LTP & LTD",
            "synaptic tagging & capture",
            "dopaminergic reward prediction error",
            "working memory",
            "episodic vs semantic vs procedural memory",
            "hippocampal replay",
            "sleep consolidation",
            "predictive processing & free-energy",
          ],
          deliverable:
            "Write a design doc mapping each biological mechanism to: the biological claim, the computational interpretation, an ML implementation idea, and the experiment that could disprove it.",
        },
        {
          label: "Tier 6",
          title: "Mechanistic interpretability",
          points: [
            "hidden activations & residual streams",
            "linear probing",
            "activation patching",
            "logit lens & tuned lens",
            "sparse autoencoders",
            "Natural Language Autoencoders",
            "representation similarity & clustering",
            "causal intervention experiments",
          ],
          deliverable:
            "Reproduce a simplified residual-stream investigation: extract activations, train linear probes for several concepts, inject knowledge via LoRA/adapter, test where it becomes detectable, and whether new memory interferes with old concepts.",
        },
        {
          label: "Tier 7",
          title: "Autonomous-agent perception & execution",
          points: [
            "screen capture",
            "OCR",
            "UI element detection",
            "action traces",
            "browser automation",
            "computer-use agents",
            "tool calling",
            "event logging",
            "human feedback capture",
            "safety gates & approval workflows",
          ],
          deliverable:
            "Build a consent-based desktop task learner for one narrow workflow that observes demos, predicts next actions, records errors, accepts correction, improves over repetitions, and requires approval before consequential actions.",
        },
      ],
    },
    {
      type: "reading",
      title: "Neural memory architectures",
      intro:
        "Study in this order. Each is a different answer to: how does memory live inside computation?",
      items: [
        {
          title: "Associative memory & Hopfield networks",
          note: "Foundation for storing and retrieving patterns.",
        },
        {
          title: "Fast weights & delta-rule memory",
          note: "Foundation for rapidly updated internal state.",
        },
        {
          title: "Gated DeltaNet",
          note: "Modern learned writing and forgetting mechanisms (improves Mamba2 with the delta rule).",
        },
        {
          title: "Test-Time Training layers",
          note: "Hidden state becomes a small model updated during inference.",
        },
        {
          title: "Titans",
          note: "Neural long-term memory module that learns to memorize at test time while attention handles current context.",
        },
        {
          title: "delta-mem",
          note: "Compact online associative state producing low-rank corrections to a frozen model's attention.",
        },
        {
          title: "HeLa-Mem",
          note: "Hebbian-inspired associative memory with episodic-to-semantic organization for LLM agents.",
        },
        {
          title: "DeepSeek Engram",
          note: "Conditional memory lookup integrated with large-model computation; treats memory and reasoning as complementary, challenging the strong 'inseparable' claim.",
        },
      ],
    },
    {
      type: "table",
      title: "Biology to ML translation",
      intro:
        "The goal is not brain vocabulary. It is turning biological principles into falsifiable ML mechanisms.",
      columns: ["Biology concept", "ML translation", "Test"],
      rows: [
        [
          "Synaptic tagging",
          "Only update adapters that contributed strongly to a corrected prediction",
          "Compare selective updates vs global LoRA updates",
        ],
        [
          "Dopamine-like feedback",
          "Scalar reward or correction signal",
          "Measure learning speed and unintended drift",
        ],
        [
          "Sleep consolidation",
          "Offline replay, pruning, regularization, distillation",
          "Compare retention before and after consolidation",
        ],
        [
          "Episodic to semantic memory",
          "Extract repeated patterns from event history into compressed rules",
          "Test generalization to unseen task variants",
        ],
      ],
    },
    {
      type: "qa",
      title: "The standard to aim for",
      intro:
        "Be able to sit with Aryaa and genuinely discuss these. This is the line between admiring the vision and being able to build it.",
      items: [
        {
          text: "Why should memory live in weights rather than an external store?",
        },
        {
          text: "How do you update online memory without catastrophic forgetting?",
        },
        {
          text: "How do you distinguish new learning from overfitting?",
        },
        {
          text: "What benchmark shows a model became better over time?",
        },
        {
          text: "What is the correct baseline against a RAG or graph-memory system?",
        },
        {
          text: "Does synaptic tagging offer anything beyond sparse adapter updates?",
        },
        {
          text: "Does offline consolidation improve retention?",
        },
        {
          text: "Can interpretability detect harmful memory interference?",
        },
        {
          text: "What safety gates are necessary for an agent acting through human tools?",
        },
        {
          text: "What experiment would falsify the architecture?",
        },
      ],
    },
    {
      type: "list",
      title: "What not to learn first",
      intro:
        "Supporting context, not the bottleneck. Understand they exist, then spend effort on the research core.",
      items: [
        {
          text: "Breeze's iOS keyboard implementation",
        },
        {
          text: "RSVP reading interfaces",
        },
        {
          text: "Full quant trading theory",
        },
        {
          text: "Startup fundraising / YC narratives",
        },
        {
          text: "Desktop app polish",
        },
        {
          text: "Marketing content",
        },
      ],
    },
  ],
};

// === Single unified track: Caleb + Mark ===
// The Neuralink neuroengineering plan and the Zoral continual-learning plan
// overlap heavily (transformers, decoding, interpretability, neuroscience),
// so they live as ONE program: the 13-week dated calendar is the execution
// spine; the Zoral projects + research library fold in as the research half.
ZORAL.projects.forEach((p, i) => {
  p.tag = "Research " + (i + 1);
});

const PLAN = Object.assign({}, NEURALINK, {
  name: "Summer 2026 — Neuroengineering & Continual Learning",
  short:
    "Closed-loop control, neural decoding & brain-inspired continual learning",
  owners: "Caleb Newton & Mark Lin",
  tagline:
    "Caleb Newton and Mark Lin. One summer across the neural-interface stack: closed-loop control, neural decoding, and brain-inspired continual learning, built backward from measured evidence.",
  thesis:
    "From neural representations to closed-loop control, and from continual learning to neural memory: a measured summer across the neural-interface and brain-inspired ML stack.",
  projects: NEURALINK.projects.concat(ZORAL.projects),
  sections: ZORAL.sections,
});

// Attach source links to the neural-memory reading list.
const READING_LINKS = {
  "Gated DeltaNet": "https://arxiv.org/abs/2412.06464",
  "Test-Time Training layers": "https://arxiv.org/abs/2407.04620",
  Titans: "https://arxiv.org/abs/2501.00663",
  "delta-mem": "https://arxiv.org/pdf/2605.12357",
  "HeLa-Mem": "https://arxiv.org/abs/2604.16839",
  "DeepSeek Engram": "https://arxiv.org/abs/2601.07372",
};
const _reading = PLAN.sections.find((s) => s.type === "reading");
if (_reading) {
  _reading.items.forEach((it) => {
    const k = it.title || it.name;
    if (READING_LINKS[k]) it.url = READING_LINKS[k];
  });
}

// References & sources library (grounding, not inflated claims).
PLAN.references = [
  {
    group: "ML foundations",
    items: [
      {
        label: "Attention Is All You Need",
        note: "The transformer.",
        url: "https://arxiv.org/abs/1706.03762",
      },
      {
        label: "LoRA: Low-Rank Adaptation",
        note: "Parameter-efficient adaptation.",
        url: "https://arxiv.org/abs/2106.09685",
      },
      {
        label: "Continual Learning in LLMs (survey)",
        note: "Methods, challenges, metrics.",
        url: "https://arxiv.org/abs/2603.12658",
      },
      {
        label: "Natural Language Autoencoders",
        note: "Interpreting activations (Anthropic).",
        url: "https://transformer-circuits.pub/2026/nla/",
      },
    ],
  },
  {
    group: "Neuroscience",
    items: [
      {
        label: "Synaptic tagging & LTP",
        note: "Frey & Morris.",
        url: "https://pubmed.ncbi.nlm.nih.gov/9020359/",
      },
      {
        label: "Sleep and the price of plasticity",
        note: "Tononi & Cirelli, SHY.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3921176/",
      },
      {
        label: "The free-energy principle",
        note: "Friston, a unified brain theory.",
        url: "https://www.nature.com/articles/nrn2787",
      },
    ],
  },
  {
    group: "Neural datasets & models",
    items: [
      {
        label: "Neural Latents Benchmark",
        note: "Public spiking datasets.",
        url: "https://neurallatents.github.io/",
      },
      {
        label: "Natural Scenes Dataset",
        note: "7T fMRI, 8 subjects.",
        url: "https://naturalscenesdataset.org/",
      },
      {
        label: "DANDI Archive",
        note: "Public neurophysiology.",
        url: "https://about.dandiarchive.org/",
      },
      {
        label: "Meta TRIBE v2",
        note: "Brain-predictive foundation model.",
        url: "https://ai.meta.com/blog/tribe-v2-brain-predictive-foundation-model/",
      },
    ],
  },
  {
    group: "Hardware & context",
    items: [
      {
        label: "Meta EMG wearable",
        note: "Wrist EMG to digital commands.",
        url: "https://www.meta.com/emerging-tech/emg-wearable-technology/",
      },
      {
        label: "Meta Wearables Device Access Toolkit",
        note: "Developer tooling.",
        url: "https://developers.meta.com/blog/introducing-meta-wearables-device-access-toolkit/",
      },
      {
        label: "Zoral",
        note: "Aryaa Saravanakumar's continual-learning vision.",
        url: "https://zoral.ai/",
      },
    ],
  },
];
