/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("test").del();
  await knex("test").insert([
    {
      id: 1,
      question: "I LIKE THE JOB WHERE ...",
      options: {
        1:"We protect our traditions, observe the main principles, and we do what is necessary",
        2:"The natural course of life is exposed by the general laws of the universe, and our task is to integrate events and maintain system integrity",
        3:" The ability to manage time and professional growth are more important than financial reward, status, or power",
        4:"I strengthen my potential and improve my professionalism, and as a result - I win",
        5:" We always take into account the motives of stakeholders",
        6:"The head (manager) protects us from the difficulties and surprises, inspiring us with the strength of his leadership",
        7:"I do not allow anybody to touch me, and, if it is necessary, I will strike anyone on the face",
      },
    },
    {
      id: 2,
      question: "EFFECTIVE LEADER IS ...",
        options:{
            1:"The flexible leader, integrating and involving the best specialists in the global village for their qualitatively new contribution to the projects",
            2:" A leader makes decisions for the survival of each and everyone in the uniform 'global village'",
            3:" The commander is leading his warriors to a complete victory over its competitors on the market",
            4:"The father is giving his protection and support to the staff, who resolves any disputes, as the highest authority",
            5:" The peace-loving leader is able to create a positive atmosphere in the team, where everyone gives warm support to achieve stable results",
            6:" A strategist that observes the corporate policy in order to ensure the harmonious work of the team",
            7:"A highly qualified manager uses the latest modern technologies of HR management and business development to achieve results"
        }
    },
    {
      id: 3,
      question: "I PERSONALLY BELIEVE THAT A WORLD IS ...",
        options:{
            1:" The market offers an abundance of attractive offers and opportunities",
            2:"The harsh life environment where only the fittest and the dodgy survive",
            3:"The exquisitely balanced system, in which the forces mutually influence each other and function as a single unit",
            4:" The place of the existence of mankind, in which we all live",
            5:"A certain highest truth governs the harmonized creation",
            6:"Rituals, filled both with mysterious signs and communications with the spirits, create a magical space for good work",
            7:"The structure was generated due to certain circumstances and chaos in its organization"
        }
    },
    {
      id: 4,
      question: "TO MANAGE STAFF IS ...",
        options:{
            1:"The competent organization of the work with the clear distribution of obligations and responsibilities between people, maintaining the established chain of command with a clear performance of the prescribed instructions and the order",
            2:"To manage according to the traditions, rules, and norms which had been created from generation to generation by previous managers",
            3:"To find and hire the most motivated professionals and talented co-workers who are interested in their career growth and development, working for getting project′s and their personal results, increasing the company′s profit",
            4:"To develop yourself and the world around yourself, maintaining its integrity and balance of interrelated forces",
            5:"To identify the level of development and to create conditions for the optimal development of each employee in a comfortable environment in order to achieve the team results",
            6:"To create a comfortable environment for the interaction and communication of different employees in resolving any disputes and conflict situations among staff",
            7:"The unconditional and authoritarian leadership in which the status of the boss can not be doubted, and the disobedience of orders is always to be punished"
        }
    },
    {
      id: 5,
      question: "MY DEEPEST BELIEFS AND VALUES ...",
        options:{
            1:"They came to me from the previous generations of the family and the ancestors with the customs of my people nation",
            2:" They are based on the conviction that we have the ability to create the future",
            3:"My energy and the forces of nature merge into a single unit to get a useful result for me and for the whole of humanity",
            4:"Being based on the knowledge of Higher Truths",
            5:"They happen because of the internal necessity of mutual communication and support",
            6:"I owe nothing to anybody, and I′m the only master of my fate",
            7:"They show my vision of the rules and norms of the interaction in the world of complex systems and the organization of the relationships between them"

        }
    }
  ]);
}
