# Tech Digest Podcast

Podcast gerado automaticamente a partir do digest semanal de newsletters e vídeos de tech.

## Feed RSS

```
https://pierry.github.io/podcast/feed.xml
```

## Setup Spotify

1. Acesse [Spotify for Creators](https://creators.spotify.com/)
2. Faça login com sua conta Spotify
3. Clique em "Add your podcast"
4. Cole a URL do feed RSS acima
5. Confirme a verificação

Depois disso, novos episódios são sincronizados automaticamente (~1h).

## Estrutura

```
podcast/
├── feed.xml          # RSS feed principal
├── cover.jpg         # Arte do podcast (3000x3000 recomendado)
├── episodes/         # Arquivos MP3 dos episódios
│   ├── ep-001-2026-03-09.mp3
│   └── ...
└── README.md
```

## Adicionar Episódio Manualmente

```bash
./scripts/add-podcast-episode.sh audio.mp3 "Título do Episódio" "Descrição"
git add . && git commit -m "Add episode" && git push
```

## Automação (TODO)

O fluxo automatizado será:
1. Cron gera digest
2. NotebookLM (`nlm`) gera áudio
3. Script adiciona ao feed
4. Git push → Spotify sincroniza
