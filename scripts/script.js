new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Dil Ko Karar Aaya",
          artist: "Sidharth Shukla & Neha Sharma",
          cover: "img/1.jpg",
          source: "mp3/1.mp3",
          url: "https://youtu.be/lX3vT_Gm_HE?si=1F0V2X0DlCAcoieo",
          favorited: false
        },
        {
          name: "Tu Mera Koi Na Hoke Bhi Kuch Lage",
          artist: "Arijit Singh | Vanun, Kriti",
          cover: "img/2.jpg",
          source: "mp3/2.mp3",
          url: "https://youtu.be/KEkuSubnZMs?si=UAyjUWD7MTfoPwFr",
          favorited: true
        },
        {
          name: "Tum Mere Ho",
          artist: "Vivan Bhathena, Ihana Dhillon",
          cover: "img/3.jpg",
          source: "mp3/3.mp3",
          url: "https://youtu.be/G-rP4TVg7vs?si=8-8-gjod8wowOoG4",
          favorited: false
        },
        {
          name: "सनम रे गाना",
          artist: "पुलकित सम्राट, यामी गौतम, उर्वशी रौतेला, दिव्या खोसला",
          cover: "img/4.jpg",
          source: "mp3/4.mp3",
          url: "https://youtu.be/MiG5jPmyDFI?si=qu4PpJFHd-10c9A_",
          favorited: false
        },
        {
          name: "मरीज़-ए-इश्‍क",
          artist: " मन्‍नारा | करणवीर",
          cover: "img/5.jpg",
          source: "mp3/5.mp3",
          url: "https://youtu.be/Ph9WRhlPacY?si=Jxcz2VYnKeabPZqN",
          favorited: true
        },
        {
          name: "Roja |A.R. Rahman ",
          artist: "Madhoo |Arvind |S.P. Balasubrahmanyam |K.S.Chithra",
          cover: "img/6.jpg",
          source: "mp3/6.mp3",
          url: "https://youtu.be/iDQ1qjCevZE?si=Jxh4EbrgKKcPZilA",
          favorited: false
        },
        {
          name: "Tere Hawaale",
          artist: " Laal Singh Chaddha | Aamir,Kareena | Arijit,Shilpa | Pritam,Amitabh,Advait",
          cover: "img/7.jpg",
          source: "mp3/7.mp3",
          url: "https://youtu.be/KUpwupYj_tY?si=3qYGj0Jdz2F6bKJy",
          favorited: true
        },
        {
          name: "तू इश़्क मेरा ",
          artist: " हेट स्टोरी 2015",
          cover: "img/8.jpg",
          source: "mp3/8.mp3",
          url: "https://youtu.be/7o9Nc9dANzs?si=l2gq0uqyp37teDAG",
          favorited: false
        },
        {
          name: "वजह तुम हो ",
          artist: " हेट स्टोरी 3 ",
          cover: "img/9.jpg",
          source: "mp3/9.mp3",
          url: "https://youtu.be/__ZvXBf1rmw?si=8W76eZIt3SEZHpfw",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
