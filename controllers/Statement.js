const Statement = require("../models/Statement");
const Income = require("../models/Income");
const Exp = require("../models/Exp");

exports.addStatement = (req, res) => {
  // find list of incomes
  Income.find().then((income) => {
    /* check if there is any income or not ,if not(income.length==0)
    any income then assign total income 0 ,otherwise store the actual income*/
    let totalInc;
    if (income.length == 0) {
      totalInc = 0;
    } else {
      var allInc = income.map((inc) => inc.amount);
      totalInc = allInc.reduce((a, b) => a + b);
    }
    // nested searching
    // find list of expenses
    Exp.find().then((expense) => {
      /* check if there is any expense or not ,if not(expense.length==0)
    any expense then assign total expense 0 ,otherwise store the actual expense */
      let totalExp;
      if (expense.length == 0) {
        totalExp = 0;
      } else {
        var allExp = expense.map((exp) => exp.amount);
        totalExp = allExp.reduce((a, b) => a + b);
      }
      //now store all data in statement database
      const newStatement = new Statement({
        user: req.user.id,
        todayInc: totalInc,
        todayExp: totalExp,
        todayTotal: totalInc - totalExp
      });
      newStatement
        .save()
        .then(() => {
          //now remove income or exp table
          Income.remove()
            .then(() => {
              Exp.remove().then(() => {
                res.status(200).json({ success: true });
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  });
};





exports.getStatement = (req, res) => {
  Statement.find({ user: req.user.id })
    .then((statement) => {
      res.json(statement);
    })
    .catch((err) => console.log(err));
};

