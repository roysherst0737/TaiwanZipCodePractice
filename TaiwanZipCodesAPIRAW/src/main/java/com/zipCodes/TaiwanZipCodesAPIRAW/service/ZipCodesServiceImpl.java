package com.zipCodes.TaiwanZipCodesAPIRAW.service;

import org.springframework.stereotype.Service;

import com.zipCodes.TaiwanZipCodesAPIRAW.repository.ZipCodesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ZipCodesServiceImpl implements ZipCodesService {
	
	private final ZipCodesRepository zipCodesRepository;
	
	@Override
	public String selectById(Long id) {
		return zipCodesRepository.findData(id);
	}

}
