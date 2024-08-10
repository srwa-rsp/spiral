/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex('stages').del();
    await knex('stages').insert([
        
            {
              id: 1,
              name: "Archaic",
              tier: 1,
              description: "Automatic, reflexive, centers around satisfaction of immediate needs.",
              color: "beige",
              challenges: "Basic survival and immediate physical needs.",
              doing: {
                coping: "Instinctual reactions.",
                needs: "Basic physiological needs such as food and safety.",
                purpose: "Survival and physical comfort."
              },
              being: {
                awareness: "Minimal awareness, focused on immediate sensory experiences.",
                experience: "Simple and unstructured.",
                affect: "Driven by basic emotions and needs."
              },
              thinking: {
                conceptions: "Pre-conceptual.",
                knowledge: "Limited and concrete.",
                interpretation: "Literal and immediate."
              }
            },
            {
              id: 2,
              name: "Magic",
              tier: 1,
              description: "Worldview is dominated by magical thinking and mythical explanations.",
              color: "purple",
              challenges: "Dependency on magical beliefs and rituals.",
              doing: {
                coping: "Rituals and magical practices.",
                needs: "Security through rituals and community.",
                purpose: "To avoid dangers through supernatural means."
              },
              being: {
                awareness: "Limited, with a strong belief in magical explanations.",
                experience: "Influenced by myths and traditions.",
                affect: "Dependent on ritualistic and communal validation."
              },
              thinking: {
                conceptions: "Magical and mythological.",
                knowledge: "Traditionally and symbolically based.",
                interpretation: "Mythically and contextually framed."
              }
            },
            {
              id: 3,
              name: "Imperial",
              tier: 1,
              description: "Focuses on power, control, and personal advantage.",
              color: "red",
              challenges: "Managing power dynamics and personal control.",
              doing: {
                coping: "Assertiveness and dominance.",
                needs: "Power and recognition.",
                purpose: "To gain and maintain control and influence."
              },
              being: {
                awareness: "Self-centered and power-focused.",
                experience: "Driven by personal gain and ambition.",
                affect: "Intense and often aggressive."
              },
              thinking: {
                conceptions: "Self-serving and strategic.",
                knowledge: "Pragmatic and instrumental.",
                interpretation: "Focused on outcomes and personal benefit."
              }
            },
            {
              id: 4,
              name: "Diplomatic",
              tier: 1,
              description: "Emphasizes social harmony and group conformity.",
              color: "amber",
              challenges: "Balancing personal needs with group expectations.",
              doing: {
                coping: "Conformity and negotiation.",
                needs: "Belonging and social approval.",
                purpose: "To maintain social order and harmony."
              },
              being: {
                awareness: "Group-oriented and social.",
                experience: "Structured by social norms and roles.",
                affect: "Concerned with fitting in and maintaining relationships."
              },
              thinking: {
                conceptions: "Socially oriented and rule-based.",
                knowledge: "Based on societal norms and expectations.",
                interpretation: "Focused on maintaining social harmony."
              }
            },
            {
              id: 5,
              name: "Achiever",
              tier: 1,
              description: "Centers around goal achievement and self-efficacy.",
              color: "orange",
              challenges: "Balancing personal achievement with collaborative goals.",
              doing: {
                coping: "Strategic planning and execution.",
                needs: "Success and recognition.",
                purpose: "To achieve goals and demonstrate competence."
              },
              being: {
                awareness: "Self-driven and goal-oriented.",
                experience: "Focused on performance and accomplishment.",
                affect: "Driven by ambition and achievement."
              },
              thinking: {
                conceptions: "Goal-oriented and results-focused.",
                knowledge: "Strategic and pragmatic.",
                interpretation: "Based on efficiency and effectiveness."
              }
            },
            {
              id: 6,
              name: "Individualist",
              tier: 1,
              description: "Focuses on individual identity and personal meaning.",
              color: "green",
              challenges: "Integrating personal values with social concerns.",
              doing: {
                coping: "Authenticity and self-expression.",
                needs: "Personal meaning and self-actualization.",
                purpose: "To explore and express personal identity and values."
              },
              being: {
                awareness: "Self-reflective and values-oriented.",
                experience: "Rich and multifaceted, centered on personal growth.",
                affect: "Concerned with authenticity and personal values."
              },
              thinking: {
                conceptions: "Identity-focused and value-driven.",
                knowledge: "Deep and personally relevant.",
                interpretation: "Based on individual perspective and meaning."
              }
            },
            {
              id: 7,
              name: "Strategist",
              tier: 2,
              description: "Integrates complexity and perspective in understanding and decision-making.",
              color: "teal",
              challenges: "Managing and integrating multiple perspectives.",
              doing: {
                coping: "Complex problem-solving and strategic integration.",
                needs: "Complexity and coherence.",
                purpose: "To integrate multiple perspectives and manage complexity."
              },
              being: {
                awareness: "Holistic and systems-oriented.",
                experience: "Understanding of complex interrelationships.",
                affect: "Balanced and integrative."
              },
              thinking: {
                conceptions: "Systems and strategy-oriented.",
                knowledge: "Comprehensive and integrative.",
                interpretation: "Focused on systemic understanding and strategy."
              }
            },
            {
              id: 8,
              name: "Alchemist",
              tier: 2,
              description: "Focuses on transformation and the evolution of self and others.",
              color: "turquoise",
              challenges: "Navigating personal and collective transformation.",
              doing: {
                coping: "Transformational leadership and guiding change.",
                needs: "Transformation and deep purpose.",
                purpose: "To facilitate and guide deep personal and collective change."
              },
              being: {
                awareness: "Transformative and integrative.",
                experience: "Focused on deep and meaningful evolution.",
                affect: "Guided by profound purpose and transformation."
              },
              thinking: {
                conceptions: "Transformational and holistic.",
                knowledge: "Deeply integrated and evolving.",
                interpretation: "Focused on transformation and evolution."
              }
            },
            {
              id: 9,
              name: "Unitive",
              tier: 2,
              description: "Centers around unity, integration, and universal consciousness.",
              color: "indigo",
              challenges: "Embodying and integrating universal principles in daily life.",
              doing: {
                coping: "Living in accordance with universal principles and unity.",
                needs: "Unity and universal connection.",
                purpose: "To embody and integrate unity and universal consciousness."
              },
              being: {
                awareness: "Unified and transcendent.",
                experience: "Integration of self and universal consciousness.",
                affect: "Guided by a sense of unity and universal love."
              },
              thinking: {
                conceptions: "Universal and integrative.",
                knowledge: "Transcendent and unified.",
                interpretation: "Focused on universal consciousness and integration."
              }
            }
          

    ]);
  };