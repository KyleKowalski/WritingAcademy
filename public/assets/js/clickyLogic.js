$(document).ready(function(){

    $(".updateStoryStatus").on("click", function(){
        event.preventDefault();
        let thisId = $(this).attr('storyId');

        $.ajax({
            type: "PUT", 
            url: "/api/story/" + thisId + "/updateStoryStatus",
            success: 
                setTimeout(function(){
                    location.reload();
                },1000)
        });
    });
    
    //Submit new story logic
    $("#createStory").on("click", function(){
        event.preventDefault();

        var newStory = {
            title: $("#createStoryTitle").val(),
            genre: $("#createStoryGenre").val(),
            openWriting: $("#openWritingToOthers").val(),
            openVoting: $("#openVotingToOthers").val(),
            minimumNumberOfVoters: $("#minimumNumberOfVoters").val(),
            minimumNumberOfWriters: $("#minimumNumberOfWriters").val(),
            scheduleActive: $("#scheduleActive").val(),
            writingTimePeriodInMins: $("#writingTimePeriodInMins").val(),
            votingTimePeriodInMins: $("#votingTimePeriodInMins").val(),
            visible: $("#visibleToPublic").val()
        }

        if (((newStory.title === "") || (newStory.title === null)) || ((newStory.genre === "") || (newStory.genre === null))){
            console.log(`Cannot create a story with an empty title or genre - placeholder until we have a modal`);
            return false;
            // TODO log an error to a modal saying 'uhh yeah, we need a title - kthxbye'
        }

        $.ajax({
            type: "POST", 
            url: "/api/newStory",
            data: JSON.stringify(newStory),
            dataType: 'json',
            contentType: 'application/json',
            success: function(story){
                window.location.href = '/updateStoryForm/'+story.StoryId
            } 
        });
    });

    //Update Story Click Function
    $("#updateStory").on("click", function(){
        event.preventDefault();
    
        var updatedStory = {
            title: $("#createStoryTitle").val(),
            genre: $("#createStoryGenre").val(),
            openWriting: $("#openWritingToOthers").val(),
            openVoting: $("#openVotingToOthers").val(),
            minimumNumberOfVoters: $("#minimumNumberOfVoters").val(),
            minimumNumberOfWriters: $("#minimumNumberOfWriters").val(),
            scheduleActive: $("#scheduleActive").val(),
            writingTimePeriodInMins: $("#writingTimePeriodInMins").val(),
            votingTimePeriodInMins: $("#votingTimePeriodInMins").val(),
            visible: $("#visibleToPublic").val()
        }

        //Ajax call here to update story:
        $.ajax({
            type: "PUT", 
            url: "/api/story/" + $("#updateStoryForm").attr('data-id') + "/update",
            data: JSON.stringify(updatedStory),
            // data: newStory,
            dataType: 'json',
            contentType: 'application/json',
            success: 
                location.href = '/viewStories'
        });
    });

    //Logic for Genre Search
    $("#genreButton").on("click", function(){
        event.preventDefault();

        //This works!! Getting user input
        var searchDataForThisGenre = $("#genreSearchInput").val()
        console.log(searchDataForThisGenre);

        $.ajax({
            type: "GET",
            url: `/api/genre/${searchDataForThisGenre}`,
            data: JSON.stringify(searchDataForThisGenre),
            dataType:'json',
            contentType:'application/json',
            success:
            location.href = `/api/genre/${searchDataForThisGenre}`
            //console.log(searchDataForThisGenre)
        });
    });

    $(".yesVote").on("click", function(){
        console.log(`clicked: yes vote for panel` + $(this).attr('targetId'));
        let target = 'panel' + $(this).attr('targetId');
        let id = $(this).attr('targetId');

        // Hide the target panel (we're done with voting for this one)
        $("#"+target).css('display', 'none');

        // TODO Add a vote for that target line
        $.ajax({
            url: `/api/line/${id}/voteYes`,
            type: 'PUT',
            success: function(result) {
                console.log(`successfully posted a yes vote for id: ${id}`);
            }
        });
    }); 

    $(".noVote").on("click", function(){
        console.log(`clicked: no vote for panel` + $(this).attr('targetId'));
        let target = 'panel' + $(this).attr('targetId');

        // Hide the target panel (we're done with voting for this one)
        $("#"+target).css('display', 'none');

        // the 'No' votes are not tallied - so we're done
    });


    $("#submitStory").on("click", function () {
        event.preventDefault();

        var writeStoryBody = {
            body: $("#storyBody").val()
        }
        $.ajax({
            type: "POST",
            url: "/api/writeStory",
            data: JSON.stringify(writeStoryBody),
            dataType: 'json',
            contentType: 'application/json',
            success: function (writeStoryBody) {
                console.log(writeStoryBody)
            }
        });
        //Clear form values
        title: $("#storyBody").val("");
    });

    //Submit Line Logic
    $("#lineSubmission").on("click", function(){
        event.preventDefault();
        // let lineToSubmit = $("#writeLineHere").val();
        var lineToSubmit = {
            lineBody: $("#writeLineHere").val()
        }

        var id = $(this).attr('thisStoryId');
        var currentLineGroup = $(this).attr('thisLineGroup');
        // console.log(lineToSubmit)
        
        $.ajax({
            type: "POST",
            url: `/api/story/${id}/${currentLineGroup}`, 
            data: JSON.stringify(lineToSubmit),
            dataType: 'json',
            contentType: 'application/json',
            success: location.href = '/viewStories'
        });
    });

})//End of document.ready 