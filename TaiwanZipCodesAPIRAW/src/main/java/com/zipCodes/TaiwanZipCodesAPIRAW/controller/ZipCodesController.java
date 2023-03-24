package com.zipCodes.TaiwanZipCodesAPIRAW.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.zipCodes.TaiwanZipCodesAPIRAW.service.ZipCodesService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/zipcodes")
@RequiredArgsConstructor
@CrossOrigin
public class ZipCodesController {
	
	private final ZipCodesService zipCodesService;
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String findById(@PathVariable Long id) {

		return zipCodesService.selectById(id);
		
	}
	

}
