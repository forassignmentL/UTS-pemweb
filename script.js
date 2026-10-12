
const themeButton = document.querySelector("#theme-toggle");
const surpriseButton = document.querySelector("#surprise-button");
const systemMessage = document.querySelector("#system-message");

// 1. Theme switcher — available on every page.
if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
    });
}

// 2. Random message — Home page only.
if (surpriseButton && systemMessage) {
    const messages = [
        "Miku is ready to sing!",
        "Loading virtual stage... Complete!",
        "You found a little piece of digital magic!",
        "Keep creating your own music and art!",
        "01 says: Have a wonderful day!"
    ];

    surpriseButton.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * messages.length);
        systemMessage.textContent = messages[randomIndex];
    });
}

// 3. Music archive — Music page only.

const trackButtons = document.querySelectorAll(".track-button");

if (trackButtons.length > 0) {
    const audioPlayer = document.querySelector("#audio-player");
    const nowPlaying = document.querySelector("#now-playing");
    const trackArtist = document.querySelector("#track-artist");
    const trackDescription = document.querySelector("#track-description");
    const playerStatus = document.querySelector("#player-status");

    const tracks = {
        world: {
            title: "World is Mine",
            artist: "ryo (supercell)",
            description: "A playful, iconic Miku pop-rock song.",
            src: "assets/audio/World Is Mine.mp3"
        },

        tell: {
            title: "Tell Your World",
            artist: "livetune (kz)",
            description: "An uplifting electronic pop song.",
            src: "assets/audio/Tell Your World.mp3"
        },

        melt: {
            title: "Melt",
            artist: "ryo (supercell)",
            description: "A classic song about the excitement of a crush.",
            src: "assets/audio/Melt.mp3"
        },

        senbon: {
            title: "Senbonzakura",
            artist: "Kurousa-P",
            description: "An energetic Japanese rock-inspired song.",
            src: "assets/audio/Senbon Zakura.mp3"
        }
    };

    trackButtons.forEach(function (button) {
        button.addEventListener("click", async function () {
            const track = tracks[button.dataset.track];

            if (!track) {
                return;
            }

            nowPlaying.textContent = track.title;
            trackArtist.textContent = track.artist;
            trackDescription.textContent = track.description;

            trackButtons.forEach(function (otherButton) {
                const selected = otherButton === button;
                const card = otherButton.closest(".song-card");

                card.classList.toggle("is-selected", selected);
                otherButton.textContent =
                    selected ? "Selected ✓" : "Play Track";

                otherButton.setAttribute(
                    "aria-pressed",
                    String(selected)
                );
            });

            // Load the selected audio file.
            audioPlayer.src = track.src;
            audioPlayer.load();

            playerStatus.textContent =
                "LOADING AUDIO // " + track.title;

            try {
                // Start playback after the visitor clicks a track.
                await audioPlayer.play();

                playerStatus.textContent =
                    "NOW PLAYING // " + track.title;
            } catch (error) {
                playerStatus.textContent =
                    "Could not play audio. Check the file path and format.";

                console.error("Audio playback failed:", error);
            }
        });
    });

    audioPlayer.addEventListener("ended", function () {
        playerStatus.textContent =
            "PLAYBACK COMPLETE // Choose another track.";
    });
}

// 4. Music note form — Music page only.
const noteForm = document.querySelector("#music-note-form");

if (noteForm) {
    const noteStatus = document.querySelector("#note-status");
    const savedNotes = document.querySelector("#saved-notes");

    noteForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#visitor-name")
            .value.trim();

        const track = document.querySelector("#favorite-track")
            .value;

        const reason = document.querySelector("#music-reason")
            .value.trim();

        if (!name || !track || !reason) {
            noteStatus.textContent =
                "Please complete all fields before saving.";

            return;
        }

        const note = document.createElement("article");
        note.classList.add("feature-card");

        const heading = document.createElement("h3");
        heading.textContent = name + "'s music note";

        const song = document.createElement("p");
        song.textContent = "Favorite track: " + track;

        const comment = document.createElement("p");
        comment.textContent = reason;

        note.append(heading, song, comment);
        savedNotes.prepend(note);

        noteStatus.textContent =
            "Your music note has been added to this page!";

        noteForm.reset();
    });
}