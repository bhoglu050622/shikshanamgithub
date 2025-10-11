'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogicDiagram from './LogicDiagram';

interface Syllogism {
  id: number;
  majorPremise: string;
  minorPremise: string;
  conclusion: string;
}

const syllogisms: Syllogism[] = [
  {
    id: 1,
    majorPremise: "सर्वे मनुष्याः मरणधर्माणः",
    minorPremise: "सोक्रेटिस मनुष्यः अस्ति",
    conclusion: "सोक्रेटिस मरणधर्मा अस्ति"
  },
  {
    id: 2,
    majorPremise: "सर्वे ज्ञानं मोक्षस्य कारणम्",
    minorPremise: "न्यायः ज्ञानम् अस्ति",
    conclusion: "न्यायः मोक्षस्य कारणम्"
  },
  {
    id: 3,
    majorPremise: "यत् अनित्यं तत् दुःखम्",
    minorPremise: "शरीरम् अनित्यम्",
    conclusion: "शरीरं दुःखम्"
  }
];

export default function SyllogismDemo() {
  const [currentSyllogism, setCurrentSyllogism] = useState(0);
  const [showingStep, setShowingStep] = useState(0); // 0: major, 1: minor, 2: conclusion

  useEffect(() => {
    const timer = setInterval(() => {
      setShowingStep((prev) => {
        if (prev === 2) {
          setCurrentSyllogism((curr) => (curr + 1) % syllogisms.length);
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentNodes = () => {
    const syllogism = syllogisms[currentSyllogism];
    const nodes = [];
    const connections = [];

    if (showingStep >= 0) {
      nodes.push({
        id: 'major',
        text: syllogism.majorPremise,
        x: 200,
        y: 100,
        type: 'premise' as const
      });
    }

    if (showingStep >= 1) {
      nodes.push({
        id: 'minor',
        text: syllogism.minorPremise,
        x: 200,
        y: 200,
        type: 'premise' as const
      });
      connections.push({ from: 'major', to: 'minor' });
    }

    if (showingStep >= 2) {
      nodes.push({
        id: 'conclusion',
        text: syllogism.conclusion,
        x: 200,
        y: 300,
        type: 'conclusion' as const
      });
      connections.push({ from: 'minor', to: 'conclusion' });
    }

    return { nodes, connections };
  };

  const { nodes, connections } = getCurrentNodes();

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-violet-100/50 rounded-3xl">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl"></div>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-violet-500 opacity-10 rounded-3xl animate-pulse"></div>
      </div>
      
      <div className="relative p-8">
        <div className="text-center mb-8">
          <motion.div
            key={`title-${currentSyllogism}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-violet-700 bg-clip-text text-transparent"
          >
            न्याय तर्क (Nyaya Logic)
          </motion.div>
          <motion.div
            key={`subtitle-${currentSyllogism}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-purple-600 mt-2"
          >
            अनुमान प्रक्रिया (Inference Process)
          </motion.div>
        </div>

        <LogicDiagram nodes={nodes} connections={connections} activeNodeId={showingStep === 0 ? 'major' : showingStep === 1 ? 'minor' : 'conclusion'} />

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-3">
            {[0, 1, 2].map((step) => (
              <motion.div
                key={step}
                className={`w-4 h-4 rounded-full ${
                  step === showingStep 
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg' 
                    : 'bg-purple-200'
                }`}
                animate={{
                  scale: step === showingStep ? 1.2 : 1,
                  opacity: step === showingStep ? 1 : 0.5,
                }}
                transition={{
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 300,
                }}
              />
            ))}
          </div>
          <motion.div
            key={`step-label-${showingStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-purple-700 font-medium"
          >
            {showingStep === 0 ? 'Major Premise (व्याप्ति)' :
             showingStep === 1 ? 'Minor Premise (पक्षधर्मता)' :
             'Conclusion (निगमन)'}
          </motion.div>
        </div>
      </div>
    </div>
  );
}