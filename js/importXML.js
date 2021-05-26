var client;
        
client = new XMLHttpRequest();
        
client.open('GET', '../XML/matches.xml');

client.onreadystatechange = function() { 
            showTables(client,"cup-match", "Cup");
            showTables(client,"league-match", "League");
            showTables(client,"friendly-match","Friendly");
            
        }

client.send();

function showTables(client,TableID, MatchType){
    var xmlDoc = client.responseXML;
            var matches = xmlDoc.getElementsByTagName("Model.Match");

            var container = document.getElementById(TableID);

            var tableString = "<table class='table'>";
            tableString+="<tr class='head'>";
            tableString+="<th>Date</th>";
            tableString+="<th>Location</th>"
            tableString+="<th>Home vs Visiting teams</th>";
            tableString+="<th>Score</th>";
            tableString+="</tr>";
            for (i = 0; i < matches.length; i++) {
                if(matches[i].getElementsByTagName("type")[0].childNodes[0].nodeValue == MatchType){
                    tableString += "<tr><td>";
                    tableString += matches[i].getElementsByTagName("date")[0].getElementsByTagName("day")[0].childNodes[0].nodeValue+"/"+matches[i].getElementsByTagName("date")[0].getElementsByTagName("month")[0].childNodes[0].nodeValue+"/"+matches[i].getElementsByTagName("date")[0].getElementsByTagName("year")[0].childNodes[0].nodeValue;
                    tableString +="</td><td>";
                    tableString += matches[i].getElementsByTagName("location")[0].getElementsByTagName("country")[0].childNodes[0].nodeValue + ", "+matches[i].getElementsByTagName("location")[0].getElementsByTagName("city")[0].childNodes[0].nodeValue+", "+matches[i].getElementsByTagName("location")[0].getElementsByTagName("stadium")[0].childNodes[0].nodeValue;
                    tableString +="</td><td>";
                    tableString += matches[i].getElementsByTagName("team1")[0].childNodes[0].nodeValue + " vs "+matches[i].getElementsByTagName("team2")[0].childNodes[0].nodeValue;
                    tableString +="</td><td>";
                    tableString += matches[i].getElementsByTagName("score")[0].childNodes[0].nodeValue;
                    tableString += "</td></tr>";
                }
            }
            tableString += "</table>";

            container.innerHTML = tableString;
}