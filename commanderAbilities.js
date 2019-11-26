/*JSON block of system info.  Data is stored here as opposed to the DB
because it is static, and universal across all campaigns. The only dynamic
bit of systems is who owns them, which is stored in the campaign model*/

var Abilities = [
    {
        "ID" : 1,
        "Title":["Master Engineer 1"],
        "Tier" : 1,
        "Cost" : 3,
        "Next" : 2,
        "Base" : "Yes",
        "Family" : 0
    },
    {
        "ID" : 2,
        "Title":["Master Engineer 2"],
        "Tier" : 2,
        "Cost" : 3,
        "Next" : 3,
        "Base" : "No",
        "Family" : 0
    },
    {
        "ID" : 3,
        "Title":["Master Engineer 3"],
        "Tier" : 1,
        "Cost" : 4,
        "Next" : -1,
        "Base" : "No",
        "Family" : 0
    },
    {
        "ID" : 4,
        "Title":["Repair Expert"],
        "Tier" : 1,
        "Cost" : 2,
        "Next" : -1,
        "Base" : "Yes",
        "Family" : 1
    },
    {
        "ID" : 5,
        "Title":["Infiltrator 1"],
        "Tier" : 1,
        "Cost" : 2,
        "Next" : 6,
        "Base" : "Yes",
        "Family" : 2
    },
    {
        "ID" : 6,
        "Title":["Infiltrator 2"],
        "Tier" : 2,
        "Cost" : 3,
        "Next" : 7,
        "Base" : "No",
        "Family" : 2
    },
    {
        "ID" : 7,
        "Title":["Infiltrator 3"],
        "Tier" : 3,
        "Cost" : 4,
        "Next" : -1,
        "Base" : "No",
        "Family" : 2
    },
    {
        "ID" : 8,
        "Title":["Concealment 1"],
        "Tier" : 1,
        "Cost" : 2,
        "Next" : 9,
        "Base" : "Yes",
        "Family" : 3
    },
    {
        "ID" : 9,
        "Title":["Concealment 2"],
        "Tier" : 2,
        "Cost" : 3,
        "Next" : 10,
        "Base" : "No",
        "Family" : 3
    },
    {
        "ID" : 10,
        "Title":["Concealment 3"],
        "Tier" : 3,
        "Cost" : 3,
        "Next" : -1,
        "Base" : "No",
        "Family" : 3
    }
]

export default Abilities