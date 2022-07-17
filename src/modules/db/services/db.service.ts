import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/modules/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/modules/albums/dto/update-album.dto';
import { CreateArtistDto } from 'src/modules/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/modules/artists/dto/update-artist.dto';
import { CreateTrackDto } from 'src/modules/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/modules/tracks/dto/update-track.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/modules/users/dto/update-password.dto';
import {
  Album,
  Artist,
  DBInterface,
  Track,
  User,
} from 'src/types';
import { v4 } from 'uuid';

@Injectable()
export class DbService {
  private db: DBInterface = {
    albums: {},
    artists: {},
    favorites: {
      albums: [],
      artists: [],
      tracks: [],
    },
    tracks: {},
    users: {},
  };

  private checkIfUserExists(id: string): void {
    if (this.db.users[id] === undefined) {
      throw new HttpException("User with such id doesn't exist", 404);
    }
  }

  private checkIfTrackExists(id: string): void {
    if (this.db.tracks[id] === undefined) {
      throw new HttpException("Track with such id doesn't exist", 404);
    }
  }

  private checkIfArtistExists(id: string): void {
    if (this.db.artists[id] === undefined) {
      throw new HttpException("Artist with such id doesn't exist", 404);
    }
  }

  private checkIfAlbumExists(id: string): void {
    if (this.db.albums[id] === undefined) {
      throw new HttpException("Album with such id doesn't exist", 404);
    }
  }
  getUsers(): Omit<User, 'password'>[] {
    const users = Object.values(this.db.users).map((origUser) => {
      const user = { ...origUser };
      delete user.password;
      return user;
    });
    return users;
  }

  getUser(id: string): Omit<User, 'password'> {
    this.checkIfUserExists(id);
    const user = { ...this.db.users[id] };
    delete user.password;
    return user;
  }

  createUser(user: CreateUserDto): User {
    const id = v4();
    const createdAt = Date.now();
    const version = 1;
    const newUser: User = {
      id,
      createdAt,
      version,
      updatedAt: createdAt,
      ...user,
    };

    this.db.users[id] = { ...newUser };
    delete newUser.password;
    return newUser;
  }

  updatePassword(id: string, payload: UpdatePasswordDto): User {
    this.checkIfUserExists(id);
    const user = this.db.users[id];
    if (user.password !== payload.oldPassword) {
      throw new HttpException('Old password is incorect', 403);
    }
    const updatedUser: User = {
      ...user,
      updatedAt: Date.now(),
      password: payload.newPassword,
      version: user.version + 1,
    };
    this.db.users[id] = { ...updatedUser };
    delete updatedUser.password;
    return updatedUser;
  }

  deleteUser(id: string): void {
    this.checkIfUserExists(id);
    delete this.db.users[id];
  }

  getTracks(): Track[] {
    return Object.values(this.db.tracks);
  }

  getTrack(id: string): Track {
    this.checkIfTrackExists(id);
    return this.db.tracks[id];
  }

  createTrack(track: CreateTrackDto): Track {
    const id = v4();
    const newTrack: Track = {
      id,
      ...track,
      albumId: track.albumId ?? null,
      artistId: track.artistId ?? null,
    };
    this.db.tracks[id] = newTrack;
    return newTrack;
  }

  updateTrack(id: string, payload: UpdateTrackDto): Track {
    this.checkIfTrackExists(id);
    const updatedTrack = { ...this.db.tracks[id], ...payload };
    this.db.tracks[id] = updatedTrack;
    return updatedTrack;
  }

  deleteTrack(id: string): void {
    this.checkIfTrackExists(id);
    delete this.db.tracks[id];
  }

  getArtists(): Artist[] {
    return Object.values(this.db.artists);
  }

  getArtist(id: string): Artist {
    this.checkIfArtistExists(id);
    return this.db.artists[id];
  }

  createArtist(artist: CreateArtistDto): Artist {
    const id = v4();
    const newArtist: Artist = {
      ...artist,
      id,
    };
    this.db.artists[id] = newArtist;
    return newArtist;
  }

  updateArtist(id: string, payload: UpdateArtistDto): Artist {
    this.checkIfArtistExists(id);
    const updatedArtist = { ...this.db.artists[id], ...payload };
    this.db.artists[id] = updatedArtist;
    return updatedArtist;
  }

  deleteArtist(id: string): void {
    this.checkIfArtistExists(id);
    delete this.db.artists[id];
  }

  getAlbums(): Album[] {
    return Object.values(this.db.albums);
  }

  getAlbum(id: string): Album {
    this.checkIfAlbumExists(id);
    return this.db.albums[id];
  }

  createAlbum(album: CreateAlbumDto): Album {
    const id = v4();
    const { artistId } = album;
    try {
      if (!!artistId) {
        this.checkIfArtistExists(artistId);
      }
    } catch (error) {
      throw new HttpException("Artist with such artistId doesn't exist", 404);
    }
    const newAlbum: Album = {
      ...album,
      id,
      artistId,
    };
    this.db.albums[id] = newAlbum;
    return newAlbum;
  }

  updateAlbum(id: string, payload: UpdateAlbumDto): Album {
    this.checkIfAlbumExists(id);
    const { artistId } = payload;
    try {
      if (!!artistId) {
        this.checkIfArtistExists(artistId);
      }
    } catch (error) {
      throw new HttpException("Artist with such artistId doesn't exist", 404);
    }
    const updatedArtist = { ...this.db.albums[id], ...payload };
    this.db.albums[id] = updatedArtist;
    return updatedArtist;
  }

  deleteAlbum(id: string): void {
    this.checkIfAlbumExists(id);
    delete this.db.albums[id];
  }

}
