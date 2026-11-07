/**
 * Official Curriculum Unit: 1.2 — Neuroscience of the Chess Brain
 * Grounded in: public/assets/chessbook/Chess_Textbook_Visual_Placement_Edition.pdf
 */

import { CurriculumUnit } from '../../../types/chess';

export const unit1_2: CurriculumUnit = {
  "id": "unit_1_2",
  "chapterId": "ch_1",
  "chapterNumber": 1,
  "unitCode": "1.2",
  "title": "Neuroscience of the Chess Brain",
  "subtitle": "Neuroscience of the Chess Brain — Textbook Curriculum Unit 1.2",
  "whatToLearn": "Neuroscience of the Chess Brain — core principles, structural mechanics, and theoretical foundations as codified in the master curriculum.",
  "whatToExpect": "A precise, technical examination of the neural systems that differentiate the expert chess brain from the novice brain, grounded in fMRI, sMRI, and EEG data from peer-reviewed studies. The unit progresses from the fundamental verbal-to-visuospatial processing shift, through the specific roles of the FFA and the pMTG-CoS network in object and pattern recognition, to the automatic precuneus-caudate circuit for next-move generation, and finally to the structural efficiency and network integration (DMN-caudate) that characterize the expert brain.",
  "expectedOutcome": "The student can identify the key brain regions and networks implicated in chess expertise (FFA, pMTG, CoS, precuneus, caudate nucleus, dlPFC, ACC) and state their specific functional roles based on empirical neuroimaging evidence. They understand that expertise is not a matter of \"using more of the brain\" but of a qualitative shift in processing pathways toward visuospatial pattern recognition, automatic subcortical retrieval, and enhanced neural efficiency. This provides a concrete biological model of how deliberate practice physically rewires the brain for expert performance.",
  "summary": "generate rapid-fire move choices, but not in amateurs. This circuit implements the automatic, yet complicated, processes of board-pattern perception and next-move generation. Exten...",
  "contentParagraphs": [
    "generate rapid-fire move choices, but not in amateurs. This circuit implements the automatic, yet complicated, processes of board-pattern perception and next-move generation. Extensive training (over 10 years) appears to shift the locus of activity from the cerebral cortex to the caudate nucleus, embedding expert decision-making in a more automatic, subcortical system. 5. Executive Control and Spatial Reasoning: PFC and Parietal Cortex While experts rely less on conscious verbal analysis, the executive control network is still engaged, but with enhanced efficiency. Experts demonstrate enhanced functional connectivity in networks underlying cognitive control and decision-making, including the anterior cingulate cortex (ACC) and the dorsolateral prefrontal cortex (dlPFC). The parietal cortex is engaged for spatial isation and attentional control. However, the structural data complicates a simple \"more activity equals better performance\" narrative: experts show reduced grey matter volume in the occipito-temporal junction and mediodorsal thalamus, changes interpreted as reflecting increased neural efficiency—a more streamlined, less metabolically costly system. 6. The Default Mode Network (DMN): Deactivation and Integration The DMN (associated with mind-wandering and self-referential thought) must be suppressed during focused cognitive tasks. Grandmaster and master-level chess players show a broader task-induced deactivation of the DMN during chess problem-solving compared to novices. More crucially, their intrinsic functional connectivity of the DMN is increased with a connectivity pattern associated with the caudate nucleus. This suggests an enhanced functional integration between the brain's resting-state architecture and the subcortical system for automatic pattern retrieval, a network configuration that better supports high-level cognitive control of behavior. What to Expect: A precise, technical examination of the neural systems that differentiate the expert chess brain from the novice brain, grounded in fMRI, sMRI, and EEG data from peer-reviewed studies. The unit progresses from the fundamental verbal-to-visuospatial processing shift, through the specific roles of the FFA and the pMTG-CoS network in object and pattern recognition, to the automatic precuneus-caudate circuit for next-move generation, and finally to the structural efficiency and network integration (DMN-caudate) that characterize the expert brain. Expected Outcome: The student can identify the key brain regions and networks implicated in chess expertise (FFA, pMTG, CoS, precuneus, caudate nucleus, dlPFC, ACC) and state their specific functional roles based on empirical neuroimaging evidence. They understand that expertise is not a matter of \"using more of the brain\" but of a qualitative shift in processing pathways toward visuospatial pattern recognition, automatic subcortical retrieval, and enhanced neural efficiency. This provides a concrete biological model of how deliberate practice physically rewires the brain for expert performance."
  ],
  "initialFen": "r2q1rk1/1bpnbppp/ppn1p3/3p4/2PP4/1PN1PN2/PBQ1BPPP/R4RK1 w - - 2 11",
  "checkpoint": {
    "question": "Which neuroanatomical area is prominently activated when master chess players perceive board patterns as unified objects?",
    "options": [
      "Only the primary auditory cortex in the temporal lobe",
      "The fusiform face area (FFA) and bilateral occipitotemporal networks, treating positions like complex familiar faces",
      "The brainstem exclusively for reflex heart rate control",
      "The motor cortex alone, anticipating hand reach movements"
    ],
    "correctIndex": 1,
    "explanation": "Neuroimaging reveals that expert chess recognition activates the Fusiform Face Area and occipitotemporal networks, processing structured chess positions as holistically as humans process familiar faces.",
    "takeaway": "With sustained practice, the visual perception engine reads board relationships automatically."
  },
  "visualPlacement": {
    "concept": "Neuroscience of the Chess Brain",
    "description": "A sourced neuroscience illustration mapping bilateral occipitotemporal activation, fusiform face area processing, and parietal spatial networks during chess perception.",
    "plannedAsset": "Downloaded figure with verified scholarly open reuse terms.",
    "assetStatus": "PLACEHOLDER"
  }
};
