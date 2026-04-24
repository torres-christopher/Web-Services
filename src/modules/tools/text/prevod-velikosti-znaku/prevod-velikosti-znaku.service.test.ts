import { describe, it, expect } from 'vitest'
import { type prevodVelikostiZnakuInput } from './prevod-velikosti-znaku.schema.js'
import {
  sentenceCase,
  lowerCase,
  upperCase,
  capitalizeCase,
  reverseText,
} from './prevod-velikosti-znaku.service.js'

describe('Case converter', () => {
  // Sentence Case
  it('Correctly capitalizes first letter of each sentence', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'lOrEm iPsUm dOlOr sIt aMeT. cOnSeCtEtUr aDiPiScInG ElIt! SeD Do eIuSmOd tEmPoR InCiDiDuNt uT LaBoRe eT DoLoRe mAgNa aLiQuA? tEnIm aD MiNiM VeNiAm, QuIs nOsTrUd eXeRcItAtIoN UlLaMcO LaBoRiS NiSi uT AlIqUiP Ex eA CoMmOdO CoNsEqUaT.',
      conversionType: 'sentence-case',
    }
    const result = sentenceCase(input)
    expect(result).toBe(
      'Lorem ipsum dolor sit amet. Consectetur adipiscing elit! Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? Tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    )
  })

  // Lower Case
  it('Correctly changes all letters to lowercase', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'lOrEm iPsUm dOlOr sIt aMeT. cOnSeCtEtUr aDiPiScInG ElIt! SeD Do eIuSmOd tEmPoR InCiDiDuNt uT LaBoRe eT DoLoRe mAgNa aLiQuA? tEnIm aD MiNiM VeNiAm, QuIs nOsTrUd eXeRcItAtIoN UlLaMcO LaBoRiS NiSi uT AlIqUiP Ex eA CoMmOdO CoNsEqUaT.',
      conversionType: 'lower-case',
    }
    const result = lowerCase(input)
    expect(result).toBe(
      'lorem ipsum dolor sit amet. consectetur adipiscing elit! sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    )
  })

  // Upper Case
  it('Correctly changes all letters to upper cases', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'lorem ipsum dolor sit amet. consectetur adipiscing elit! sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      conversionType: 'upper-case',
    }
    const result = upperCase(input)
    expect(result).toBe(
      'LOREM IPSUM DOLOR SIT AMET. CONSECTETUR ADIPISCING ELIT! SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA? TENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT.',
    )
  })

  // Capitalized Case
  it('Correctly capitalizes each first letter of a word', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'lorem ipsum dolor sit amet. consectetur adipiscing elit! sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      conversionType: 'capitalized-case',
    }
    const result = capitalizeCase(input)
    expect(result).toBe(
      'Lorem Ipsum Dolor Sit Amet. Consectetur Adipiscing Elit! Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua? Tenim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat.',
    )
  })

  // Reverse text
  it('Correctly reverses the string', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'Lorem ipsum dolor sit amet. Consectetur adipiscing elit! Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? Tenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      conversionType: 'reverse',
    }
    const result = reverseText(input)
    expect(result).toBe(
      '.tauqesnoc odommoc ae xe piuqila tu isin sirobal ocmallu noitaticrexe durtson siuq ,mainev minim da mineT ?auqila angam erolod te erobal tu tnudidicni ropmet domsuie od deS !tile gnicsipida rutetcesnoC .tema tis rolod muspi meroL',
    )
  })

  // Cyrillic - Sentence Case
  it('Correctly capitalizes first letter of each Cyrillic sentence', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'привет мир. как дела!',
      conversionType: 'sentence-case',
    }
    const result = sentenceCase(input)
    expect(result).toBe('Привет мир. Как дела!')
  })

  // Cyrillic - Lower Case
  it('Correctly lowercases Cyrillic text', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'ПРИВЕТ МИР',
      conversionType: 'lower-case',
    }
    const result = lowerCase(input)
    expect(result).toBe('привет мир')
  })

  // Cyrillic - Upper Case
  it('Correctly uppercases Cyrillic text', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'привет мир',
      conversionType: 'upper-case',
    }
    const result = upperCase(input)
    expect(result).toBe('ПРИВЕТ МИР')
  })

  // Cyrillic - Capitalized Case
  it('Correctly capitalizes each Cyrillic word', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'привет мир',
      conversionType: 'capitalized-case',
    }
    const result = capitalizeCase(input)
    expect(result).toBe('Привет Мир')
  })

  // Cyrillic - Reverse
  it('Correctly reverses Cyrillic text', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'привет мир',
      conversionType: 'reverse',
    }
    const result = reverseText(input)
    expect(result).toBe('рим тевирп')
  })

  // Arabic - Lower Case (Arabic has no case — should return unchanged)
  it('Returns Arabic text unchanged on lowerCase', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'مرحبا بالعالم',
      conversionType: 'lower-case',
    }
    const result = lowerCase(input)
    expect(result).toBe('مرحبا بالعالم')
  })

  // Arabic - Upper Case (Arabic has no case — should return unchanged)
  it('Returns Arabic text unchanged on upperCase', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'مرحبا بالعالم',
      conversionType: 'upper-case',
    }
    const result = upperCase(input)
    expect(result).toBe('مرحبا بالعالم')
  })

  // Arabic - Reverse
  it('Correctly reverses Arabic text', () => {
    const input: prevodVelikostiZnakuInput = {
      text: 'مرحبا',
      conversionType: 'reverse',
    }
    const result = reverseText(input)
    expect(result).toBe('ابحرم')
  })

  // Chinese - Reverse
  it('Correctly reverses Chinese text', () => {
    const input: prevodVelikostiZnakuInput = {
      text: '你好世界',
      conversionType: 'reverse',
    }
    const result = reverseText(input)
    expect(result).toBe('界世好你')
  })
})
