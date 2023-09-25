import {
  getDisabledPlayButtonRow,
  getPlayButtonRow,
} from "../embeds/music/buttonRowEmbed.js";
import { getQueueEmptyEmbed } from "../embeds/music/exceptionsEmbed.js";
import { getPlayPlaylistEmbed } from "../embeds/music/playEmbed.js";
export default class QueueController {
  constructor() {}
  guildId = "";
  queueReply = [];
  currentTrackIndex = 0;
  nextTrackIndex = this.currentTrackIndex + 1;
  currentTrack = {};
  anyPlaylistOngoing = false;
  playlists = [];
  movingIntoPlaylist = false;
  playlistTrackCounter = 0;
  stopCommandIssued = false;
  moveActiveRow(lastTrack = false) {
    const currentReply = this.queueReply[this.currentTrackIndex];
    currentReply.edit(getDisabledPlayButtonRow());
    if (lastTrack) return;
    const nextTrackReply = this.queueReply[this.nextTrackIndex];
    const embedUpdate = getPlayButtonRow(true);
    nextTrackReply.edit(embedUpdate);
    if (this.movingIntoPlaylist && this.anyPlaylistOngoing) {
      this.movingIntoPlaylist = false;
    }
    this.currentTrackIndex++;
    this.nextTrackIndex = this.currentTrackIndex + 1;
  }
  setTrackMoveEventListener(queue) {
    queue.dispatcher.on("finish", () => {
      if (this.playlists.length != 0) {
        if (this.anyPlaylistOngoing) {
          this.playlistTrackCounter++;
          if (this.playlists[0].length == this.playlistTrackCounter) {
            this.anyPlaylistOngoing = false;
            this.playlists.shift();
            this.playlistTrackCounter = 0;

            if (this.playlists.length != 0) {
              if (this.queueReply[this.nextTrackIndex]) {
                if (this.nextTrackIndex == this.playlists[0].startIndex) {
                  this.movingIntoPlaylist = true;
                  this.anyPlaylistOngoing = true;
                }
              }
            }
          }
        } else {
          if (this.queueReply[this.nextTrackIndex]) {
            if (this.nextTrackIndex == this.playlists[0].startIndex) {
              this.movingIntoPlaylist = true;
              this.anyPlaylistOngoing = true;
            }
          }
        }
      }

      if (
        !(!this.queueReply[this.nextTrackIndex] && !this.anyPlaylistOngoing)
      ) {
        this.currentTrack = queue.history.queue.__current.raw;
      }

      if (this.anyPlaylistOngoing) {
        this.playlists[0].reply.edit(
          getPlayPlaylistEmbed(
            this.playlists[0].title,
            this.playlists[0].length,
            this.playlists[0].url,
            this.playlists[0].author,
            this.playlistTrackCounter + 1,
            this.playlists[0].addedBy,
            this.currentTrack
          )
        );
      }
      if (this.anyPlaylistOngoing) {
        if (!(!this.movingIntoPlaylist && this.anyPlaylistOngoing)) {
          this.moveActiveRow();
        }
      } else {
        if (this.queueReply[this.nextTrackIndex]) {
          this.moveActiveRow();
        } else {
          this.moveActiveRow(true);

          if (!this.stopCommandIssued) {
            this.queueReply[this.currentTrackIndex].reply(getQueueEmptyEmbed());
          } else {
            this.stopCommandIssued = false;
          }
          this.queueReply = [];
          this.currentTrackIndex = 0;
          this.nextTrackIndex = this.currentTrackIndex + 1;
          this.stopCommandIssued = false;
          this.anyPlaylistOngoing = false;
          this.playlists = [];
          this.movingIntoPlaylist = false;
          this.playlistTrackCountethis;
          this.currentTrack = {};
        }
      }
    });
  }
}
