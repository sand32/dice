var cmd = require("commander"),
	
	parseComponent = function(component){
		var result = 0, parsed;
		if(component.indexOf("d") !== -1){
			var tokens = component.split("d"),
				rolls = parseInt(tokens[0]),
				sides = parseInt(tokens[1]);

			if(!rolls){
				rolls = 1;
			}
			if(!sides
			|| tokens.length > 2){
				console.log("Error: Unparsable token: \"" + component + "\"");
				return 0;
			}

			for(var i = 0; i < rolls; i += 1){
				result += rollDie(sides);
			}
		}else{
			parsed = parseInt(component);
			if(parsed === NaN){
				console.log("Error: Unparsable token: \"" + component + "\"");
				return 0;
			}
			result += parsed;
			console.log("Modifier: " + result.toString());
		}
		return result;
	},

	rollDie = function(sides){
		var roll = Math.floor(Math.random() * (sides - 1) + 1);
		console.log("d" + sides.toString() + ": " + roll.toString());
		return roll;
	},

	invalidCommandAction = function(){
		console.log("You must use a valid command.\n\nUse -h for more info.");
	};

cmd.version("0.1.0");

cmd
	.command("roll <roll>")
	.description("Rolls the specified dice with the given modifiers.")
	.action(function(roll){
		var components = roll.split("+"), result = 0;
		for(var i = 0; i < components.length; i += 1){
			result += parseComponent(components[i]);
		}
		console.log("Result: " + result.toString());
	});

cmd
	.command("*")
	.action(invalidCommandAction);

cmd.parse(process.argv);

if(process.argv[process.argv.length - 1].indexOf("rcon") !== -1){
	invalidCommandAction();
}
